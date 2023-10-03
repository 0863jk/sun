from allauth.account.adapter import DefaultAccountAdapter

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        # 기본 저장 필드: first_name, last_name, username, email
        user = super().save_user(request, user, form, False)
        # 추가 저장 필드
        name = data.get('name')
        phone1 = data.get('phone1')
        phone2 = data.get('phone2')
        phone3 = data.get('phone3')
        role = data.get('role')
        if name:
            user.name = name
        if phone1:
            user.phone1 = phone1
        if phone2:
            user.phone2 = phone2
        if phone3:
            user.phone3 = phone3
        if role:
            user.role = role

        user.save()
        return user