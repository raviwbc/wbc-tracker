import { boolean } from "yup"

export class manualEntryData {
    projectID: number = 0
    userID: number =0
    taskID: number=0
    startTime: string = ""
    endTime: string = ""
    timeSheetDate: string = ""
    timeAdded: string = ""
    minutes: number = 0
    comment: string = ""
    tlComments: string = ""
    taskStatus: string = ""
    flog: boolean = false
    isAuto: boolean = false
  }
  export class responcedata {
    Loading : boolean = false
    data: any
    message : string = ""

  }

  export class ReducersList {
    manualEntryReducer : responcedata
    counterReducer : responcedata
    postListReducer : responcedata
    trackerReducer : responcedata
    loginValidationReducer : responcedata
    entryListReducer: responcedata
  }


  
export class tasklist{
comment: string | null
endDate: string | null
endTime: string | null
entered: string | null
startDate: string | null
startTime: string | null
taskStatus: string | null
userName: string | null
minutes: number
projectID: number
taskID: number
userID: number
taskName: string | null
isAuto: boolean = false
isRestart: boolean = false
autoUpdate: boolean = false
projectName: string | null
}