<template>
  <v-app>
    <SurveyButton />
    <navigation-menu-bar v-if="$route.name !== 'HomeView'" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationMenuBar from './navigationBar/NavigationMenuBar.vue'
import SurveyButton from './floatingButton/pages/surveyButton.vue'

export default defineComponent({
  components: {NavigationMenuBar, SurveyButton}, 
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>
