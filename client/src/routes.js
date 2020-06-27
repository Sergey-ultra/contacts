import React from'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {Contacts} from "./components/Contacts";
import {Create} from "./components/Create";
import {Detail} from "./components/Detail";
import {Auth} from "./components/Auth";

export const useRoutes = isAuthenticated => {
   if (isAuthenticated){
       return(
           <Switch>
               <Route exact path='/contacts' >
                   <Contacts/>
               </Route>
               <Route exact path='/create' >
                   <Create/>
               </Route>
               <Route path='/contacts/:id' >
                   <Detail/>
               </Route>
               <Redirect to='/contacts'/>
           </Switch>
       )
   }
   return(
       <Switch>
           <Route exact path='/'>
               <Auth/>
           </Route>
           <Redirect to='/'/>
       </Switch>
   )

}