export const APP_CONSTANTS = {
    SERVICE_BASE_URL : 'http://192.168.1.137/Blueprint/api',
    API: {
    GETPROJECTLIST : '/Task/Get?userid=',
    LOGIN : '/Auth/Login',
    LogOff : '/Auth/LogOff',
    GETSTART : '/Task/GetStart',
    POSTMANUALENTRY : '/Task/ManualEntry',
    ENTRYLIST : '/Task/CurrentDayTaskListDetails?TimeSheetDate=',
    DELETETASK : '/Task/TaskDelete?id=',
    POSTAUTOENTRY : '/Task/AutoEntry',
    POSTAUTOENTRYSTOP : '/Task/TimeSheetStopEntry',
    }
}
