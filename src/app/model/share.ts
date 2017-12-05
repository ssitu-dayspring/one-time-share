export interface ShareContent
{
    content: string;
}

export interface Share
{
    sender_email: string;
    receiver_email: string;
    share_content: ShareContent;
    date_created: string;
    is_active: boolean;
}