export interface PastebinParametersRequestLogin {
    api_dev_key: string,
    api_user_name: string,
    api_user_password: string
}

export interface PastebinParametersRequestPost {
    api_dev_key: string,
    api_paste_code: string,
    api_paste_private: number,
    api_paste_name: string,
    api_paste_expire_date: string,
    api_paste_format: string,
    api_user_key: string,
    api_option: string
}
