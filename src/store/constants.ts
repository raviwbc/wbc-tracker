export const APP_CONSTANTS = {
    SERVICE_BASE_URL : 'http://192.168.1.137/Blueprint/api',
    API: {
    GETPROJECTLIST : '/Task/Get?userid=',
    LOGIN : '/Auth/Login',
    LogOff : '/Auth/LogOff',
    GETSTART : '/TimeTracker/GetStart',
    POSTMANUALENTRY : '/TimeTracker/ManualEntry',
    ENTRYLIST : '/TimeTracker/CurrentDayTaskListDetails?TimeSheetDate=',
    DELETETASK : '/TimeTracker/Delete?id=',
    POSTAUTOENTRY : '/TimeTracker/AutoEntry',
    POSTAUTOENTRYSTOP : '/TimeTracker/TimeSheetStopEntry',
    }
}
