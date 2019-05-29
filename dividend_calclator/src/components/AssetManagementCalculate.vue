<template>
  <div class="calculate_section">
    <h1>配当金計算アプリ</h1>

    <v-container
    id="input-usage"
    grid-list-xl
    fluid
  >
    <v-layout wrap>
      <v-flex xs12>
        <v-input
          :messages="['Messages']"
          append-icon="close"
          prepend-icon="phone"
        >
          Default Slot
        </v-input>
      </v-flex>
    </v-layout>
  </v-container>



    <div class="">
      <label for="stock_price">現在株価</label>
      <!-- .numberがなければ文字列として認識してしまう -->
      <input class="" type="number" v-model.number="stock_price" placeholder="現在の株価を入力してください">円
    </div>
    <div class="">
      <label for="earnings_per_share">1株あたり配当金</label>
      <input type="number" v-model.number="earnings_per_share" placeholder="1株あたり配当金を入力してください">円
    </div>
    <p>年間配当利回り:{{ dividendYieldCalculate }} %</p>
    <div class="">
      <label for="number_of_shares">購入株数</label>
      <input type="number" v-model.number="number_of_shares" placeholder="購入したい株数を入力してください">株
    </div>
    <div class="">
      <label for="number_of_years">運用する年数</label>
      <input type="number" v-model.number="number_of_years" placeholder="運用する年数を入力してください">年
    </div>
    <div class="">
      <p>{{ number_of_years }}年後には、{{ amountOfShare }}円が{{ totalAmountOfMoney }}円となります。</p>
      <p>ここから下に利回り計算後の表が出ます。</p>
      <table>
        <tr>
          <th></th>
          <td>利回り計算後の金額</td>
        </tr>
        <tr v-for="number_of_year in number_of_years">
          <th>{{ number_of_year }}年後</th>
          <td>{{ Math.round(amountOfShare * Math.pow(rateOfIncrease, number_of_year)) }}円</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetManagementCalculate',
  data () {
    return {
      stock_price: null,
      earnings_per_share: null,
      number_of_shares: null,
      number_of_years: null
    }
  },

  computed: {
    dividendYieldCalculate: function() {
      let base_dividend_yield = this.earnings_per_share / this.stock_price * 100
      let number_of_digits = 2
      let dividend_yield_result = Math.ceil(base_dividend_yield * Math.pow(10, number_of_digits)) / Math.pow(10, number_of_digits)
      return dividend_yield_result
    },

    amountOfShare: function() {
      return this.stock_price * this.number_of_shares
    },

    rateOfIncrease: function() {
      return 1 + this.dividendYieldCalculate / 100
    },

    totalAmountOfMoney: function() {
      return Math.round(this.amountOfShare * Math.pow(this.rateOfIncrease, this.number_of_years))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
