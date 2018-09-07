<template lang="pug">
  modal.tm-modal-stake(v-if="active" :close="close")
    div(slot='title')
      .tm-stake-title
        img.icon(class='atom' src="~assets/images/cosmos-logo.png")
        span(class="tm-stake-title") Stake

    .tm-stake-main
      tm-form-group(
        :error='$v.amount.$error'
        field-id='amount'
        field-label='Amount'
      )
        tm-field#amount(
          type="num"
          v-model="amount")
        tm-form-msg(name='Amount' type='between' :min='1' :max='unbondedAtoms'
          v-if='!$v.amount.between')

      tm-form-group(
        field-id='to' field-label='To')
        tm-field#to(v-model="config.modals.stake.to")

      tm-form-group(
        field-id='from' field-label='From')

        tm-field#from(
          type="select"
          :options="fromOptions"
          v-model="fromActive"
        )

    .tm-stake-footer
      tm-btn(@click.native="stake" color="primary" value="Stake" size="lg")
</template>

<script>
import { between } from "vuelidate/lib/validators"
import { mapGetters } from "vuex"
import Modal from "common/TmModal"
import {
  TmBtn,
  TmField,
  TmFormGroup,
  TmFormMsg,
  TmFormStruct
} from "@tendermint/ui"
export default {
  name: "modal-stake",
  props: ["value"],
  components: {
    Modal,
    TmBtn,
    TmField,
    TmFormGroup,
    TmFormMsg,
    TmFormStruct
  },
  data: () => ({
    amount: 1,
    fromActive: `wallet`
  }),
  computed: {
    ...mapGetters([`config`, `totalAtoms`, `oldBondedAtoms`, `wallet`]),
    active() {
      return this.config.modals.stake.to !== ``
    },
    fromOptions() {
      return [{ key: `My Wallet - ${this.wallet.address}`, value: `wallet` }]
    },
    unbondedAtoms() {
      return this.totalAtoms - this.oldBondedAtoms
    }
  },
  methods: {
    close() {
      this.$store.commit("setModalStake", ``)
    },
    stake() {
      console.log(`STAKE`)
      console.log(this.amount)
      this.$v.$touch()
      // if (this.$v.$error) return
    }
  },
  validations() {
    return {
      amount: {
        between: between(1, this.unbondedAtoms)
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~variables';

.tm-modal.tm-modal-stake {
  z-index: z(modalError);
}

.atom {
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
}

.tm-stake-wrapper {
  position: relative;
  z-index: z(modal);

  .tm-stake-backdrop {
    position: absolute;
    top: -10vw;
    left: -10vw;
    width: 50vw;
    opacity: 0.25;
  }
}

.tm-field-checkbox {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .tm-field-checkbox-input {
    flex: 0 0 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--app-fg);

    input {
      width: auto;
      display: block;
      padding: 0;
      margin: 0;
    }
  }

  .tm-field-checkbox-label {
    flex: 1;
    line-height: 1.375;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}

.tm-stake-container {
  &:not(.tm-form) {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
  }

  &.tm-form {
    .tm-form-main {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-flow: column nowrap;
    }
  }
}

.tm-stake-title {
  align-items: center;
  display: flex;
  flex: 1;
  font-size: xl;
  text-align: center;
  color: var(--txt);
}

.tm-stake-main {
  min-height: 0;
  background: var(--app-fg);
  overflow-y: auto;
  position: relative;

  .tm-bar-discrete {
    margin: 1rem auto;
  }

  img {
    margin: 0 auto;
    max-width: 300px;
    display: block;
  }

  .ps-scrollbar-y-rail {
    display: none;
  }

  > p {
    padding: 1rem;
    border-bottom: px solid var(--bc);
  }
}

.tm-stake-label {
  padding: 1rem;
  background: var(--app-fg);
  color: var(--txt);
  text-align: center;
}

.tm-stake-footer {
  background: var(--app-fg);
  flex: 0 0 5rem + px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-left: 1rem;
  }

  &:empty {
    display: none;
  }
}

.tm-form-group__label {
  color: var(--dim);
  font-size: sm;
  line-height: xl;
}

.tm-stake-footer > div {
  display: flex;
  justify-content: space-between;
}

@media screen and (min-width: 768px) {
  .tm-stake-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    background: var(--app-bg);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tm-stake {
    position: static;
    shadow();
  }

  .tm-stake-container {
    &:not(.tm-form), &.tm-form .tm-form-main {
      width: 32rem;
      max-height: 100vh;
      height: auto;
    }
  }

  .tm-stake-header {
    background: var(--app-nav);
    margin-top: 0;
  }

  .tm-stake-main {
    padding: 3rem 1rem;

    .tm-form-group {
      display: block !important;
    }
  }
}
</style>
