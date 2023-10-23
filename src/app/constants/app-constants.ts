export class Constants {
    public static get EMPTY(): string { return ""; };
    public static get DATE_FORMAT(): string { return "YYYY/MM/DD"; };
    public static get DATETIME_FORMAT(): string { return "YYYY/MM/DD HH:mm:ss"; };
    public static get DATE_FORMAT_MTR(): string { return "DD-MM-YYYY"; };
    public static get DATE_FORMAT_MTR_HH(): string { return "DD-MM-YYYY-HH-mm-ss"; };

    //Notifies Types
    public static get DANGER_NOTIFY(): string { return "danger"; };
    public static get WARNING_NOTIFY(): string { return "warning"; };

    //ACTIONS
    public static get ACTION_EDIT(): string { return "EDIT"; };
    public static get ACTION_CANCEL(): string { return "CANCEL"; };
    public static get ACTION_DELETE(): string { return "DELETE"; };

    //URL'S
    public static get URL_LABELS(): string { return "assets/properties/label.json"; };
    public static get URL_CONFIGS(): string { return "assets/config/config.json"; };
    public static get URL_MESSAGES(): string { return "assets/properties/messages.json"; };

    //DOCUMENT LENGTH
    public static get DOCUMENT_MIN_LENGTH(): number { return 7; };
    public static get DOCUMENT_MAX_LENGTH(): number { return 12; };
}
