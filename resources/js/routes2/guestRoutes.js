import HomeIndex from '../components/guest/Home.vue';
import PlayersList from '../components/guest/PlayersList.vue';
import Player from '../components/guest/Player.vue';

export default [
    {path:"/",component:HomeIndex},
    {path:"/players",component:PlayersList,
            children:[
                {name:'player',path:":op(player)/:id(\\d+)?",component:Player}
            ]
    },
    {path:"/player/:id",redirect:to =>`/players/player/${to.params.id}`}
]
