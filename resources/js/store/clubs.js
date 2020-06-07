let clubs = [];
for(var i=1;i<=18;i++){
    clubs.push({
        logo:'/images/AdminLTELogo.png/',
        name:`${['Buddu','Ssingo','Kyagwe','Bulemezi'][i%4]} #  ${i}`,
    });
}

export default {
    namespaced:true,
    state:{
        clubComponentSelected:'table',
        selectedClubItem:null,
        clubs:clubs,
    },

    getters:{

    },

    mutations:{
        selectClubComponentMutation(currentState,selection){
            currentState.clubComponentSelected = selection;
        },
        selectClubItemMutation(currentState,item){
            currentState.selectedClubItem = item;
        },
        getClubsMutation(currentState,clubs){
            currentState.clubs = clubs;
        }

    },

    actions:{
        getClubsActions(context){

            let clubs = [];
            for(var i=1;i<=18;i++){
                this.clubs.push({
                    logo:'/images/AdminLTELogo.png/',
                    name:`${['Buddu','Ssingo','Kyagwe','Bulemezi'][i%4]} #  ${i}`,
                });
            }
            context.commit('getClubsMutation',clubs);
        }
    }
}
