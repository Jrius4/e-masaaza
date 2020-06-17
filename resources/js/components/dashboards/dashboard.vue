<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h3>Dashboard</h3>
            <p v-if="user!== null" class="text-center">
               Welcome {{user.name}}, :)
            </p>
          </v-col>
          <div class="col-lg-3 col-6 animated flipInY">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>150</h3>

                <p>Current Requests</p>
              </div>
              <div class="icon">
                <i class="fa fa-copy"></i>
              </div>
              <router-link :to="{name:'requests'}" class="small-box-footer stretched-link">More info <i class="fas fa-arrow-circle-right"></i></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6 animated flipInY">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>18<sup style="font-size: 20px">teams</sup></h3>

                <p>Masaza Clubs</p>
              </div>
              <div class="icon">
                <v-icon>mdi-soccer-field</v-icon>
              </div>
              <router-link :to="{name:'clubs'}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6 animated flipInY">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>44</h3>

                <p>Personel Registrations</p>
              </div>
              <div class="icon">
                <i class="fas fa-users"></i>
              </div>
              <router-link :to="{name:'requests'}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6 animated flipInY">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>65</h3>

                <p>Player Registrations</p>
              </div>
              <div class="icon">
                <i class="fas fa-users"></i>
              </div>
              <router-link :to="{name:'requests'}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
            </div>
          </div>
          </v-row>


      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
    name:'Dashboard',
    data:()=>({
        user:null,
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
    }),
    beforeCreate(){
        this.$store.dispatch("getUserAction").then((response) => {
           this.user =  this.$store.state.user
        }).catch((err) => {
            console.log(err)
        });
    },

}
</script>

<style>

</style>
