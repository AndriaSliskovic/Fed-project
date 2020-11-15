import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        thresholds: {
          xs: 321,
          sm: 430,
          md: 769,
          lg: 1367,
        },
        scrollBarWidth: 24,
      },
    theme: {
        themes: {
            light: {
                primary: '#742d6c',
                secondary: '#f8f4ec',
                nettext:'#102542',
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
