import create from 'zustand'

export const useExamStateStore = create(
    set => ({
        examState: "INIT",
        vehicleID: "",
        testID: "",
        studentID:"",
        updateExamState:    (newState) =>   set(state => ({ examState:newState })),
        updateVehicleID:    (newState) =>   set(state => ({ vehicleID:newState })),
        updateTestID:       (newState) =>   set(state => ({ testID:newState })),
        updateStudentID:    (newState) =>   set(state => ({ studentID:newState }))
    })
 
)