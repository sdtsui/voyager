<template lang="pug">
#app
  qr-code(:value="JSON.stringify(localIPs)" :options="{ size: 200 }" style="position: absolute; z-index: 10000;")
  template(v-if="!config.modals.session.active")
    app-header
    #app-content
      router-view
      app-footer
    modal-help
  session(v-else)
  notifications(:notifications='notifications' theme='cosmos')
  modal-error(v-if='config.modals.error.active' :body='config.modals.error.message')
</template>

<script>
import { mapGetters } from 'vuex'
import QrCode from '@xkeshi/vue-qrcode'
import AppHeader from 'common/AppHeader'
import AppFooter from 'common/AppFooter'
import Notifications from '@nylira/vue-notifications'
import ModalError from 'common/NiModalError'
import ModalHelp from 'common/NiModalHelp'
import Session from 'common/NiSession'
import store from './vuex/store'
export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    ModalError,
    ModalHelp,
    Notifications,
    Session,
    QrCode
  },
  computed: {
    ...mapGetters(['notifications', 'config']),
    localIPs () {
      var os = require('os');
      var ifaces = os.networkInterfaces();
      var addresses = []
      Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
          }

          addresses.push(iface.address);
        });
      });
      return addresses
    }
  },
  store
}
</script>

<style lang="stylus" src="./styles/app.styl"></style>
