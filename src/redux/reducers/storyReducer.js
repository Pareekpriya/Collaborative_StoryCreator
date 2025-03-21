import { EDIT_STORY_FAILURE, EDIT_STORY_REQ, EDIT_STORY_SUCCESS, FETCH_STORY, FETCH_STORY_FAILURE, FETCH_STORY_REQ, POST_STORY, POST_STORY_FAILURE, POST_STORY_REQ } from "../actions/storyAction";

const initState = {
    story: [],
    loading:false,
    error:null
};

export const storyReducer = (state=initState,action)=>{
    switch(action.type){
       case FETCH_STORY_REQ:
         return{...state,loading:true} 
       case FETCH_STORY:
         return {...state,loading:false,story:action.payload};
       case FETCH_STORY_FAILURE:
          return {...state,loading:false,error:action.payload}  
        case POST_STORY_REQ:
            return {...state,loading:true}
        case POST_STORY:
            return {...state,loading:false,story:[...state.story,action.payload]}  
        case POST_STORY_FAILURE:
            return {...state,loading:false,error:action.payload}  
        case EDIT_STORY_REQ:
            return {...state,loading:true} 
        case EDIT_STORY_SUCCESS:
            return {...state,loading:false, 
                    story: state.story.map((s)=>(
                      s.id === action.payload.id ?
                      {...s, contributions:action.payload.contributions} 
                      : s
                    ))
            };
        case EDIT_STORY_FAILURE:
            return {...state,loading:false,error:action.payload}                 
       default:
         return state;
    }
}