import AuthIndex from '../components/auth/AuthIndex';
import IndexSecretary from "./../components/secretary/IndexSecretary";
import ViewRequests from "./../components/secretary/ViewRequests";
import RequestsEditor from "./../components/secretary/RequestsEditor";

export default [
    {path:"/",component:AuthIndex},
    {path:"/secretary",component:IndexSecretary,
            children:[
                {name:"table",path:"list",component:ViewRequests},
                {name:"editor",path:":op(create|edit)/:id(\\d+)?",component:RequestsEditor},
            ]
    },
    {path:"/edit/:id",redirect:to =>`/secretary/edit/${to.params.id}`}
]
