export const getCenter = (rawData) => {
    const { data } = {
        center_id: rawData.center_id,
        center_name: rawData.center_name,
        description: rawData.description,
        manager_id: rawData.manager_id,
        manager_name: rawData.manager_name,
        address1: rawData.address1,
        address2: rawData.address2,
        business_number: rawData.business_number,
        created_date: rawData.created_date,
    }
    return data;
}

export const getCenterList = (rawData) => {
    return rawData.map(
        ({center_id, center_name, description, manager_id, manager_name, address1, address2, business_number, created_date}) => {
            return {
                center_id: center_id,
                center_name: center_name,
                description: description,
                manager_id: manager_id,
                manager_name: manager_name,
                address1: address1,
                address2: address2,
                business_number: business_number,
                created_date: created_date,
            }
        },
    )
}