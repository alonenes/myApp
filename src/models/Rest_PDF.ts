export interface Datum {
    menu_category_id: string;
    admin_type: string;
    menu_category_name: string;
    menu_category_level: string;
    attach_id: string;
    attach_description: string;
    employee_code: string;
    employee_name: string;
    attach_path: string;
    attach_size: string;
    attach_original_name: string;
    attach_datetime: string;
    attach_datetime_ori: string;
    attach_new: string;
    usercrewgroup: string;
    attach_type: string;
}

export interface downloaddata {
    data: Datum[];
}