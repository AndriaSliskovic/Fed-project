import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        thresholds: {
          xs: 320,
          sm: 540,
          md: 768,
          lg: 1366,
        },
        scrollBarWidth: 24,
      },
    theme: {
        themes: {
            light: {
                primary: '#7B1FA2',
                secondary: colors.blueGrey.lighten5,
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            },
            dark: {
                primary: colors.deepOrange.darken1,
                secondary: colors.blueGrey.darken1,
                accent: '#FF4081',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            }
        }
    }
});
