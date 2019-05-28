<template>
  <div class="calculate_section">
    <h1>配当金計算アプリ</h1>
    <div class="">
      <label for="stock_price">株価</label>
      <input v-model="stock_price" placeholder="現在の株価を入力してください">
    </div>
    <div class="">
      <label for="earnings_per_share">1株あたり配当金</label>
      <input v-model="earnings_per_share" placeholder="1株あたり配当金を入力してください">
    </div>
    <p>年間配当利回り:{{ dividendYieldCalculate }} %</p>
    <div class="">
      <label for="">購入株数</label>
      <input v-model="number_of_shares" placeholder="購入したい株数を入力してください">
    </div>
    <div class="">
      <label for="">運用する年数</label>
      <input v-model="number_of_years" placeholder="運用する年数を入力してください">
    </div>
    <table>
      <tr>
        <th></th>
        <td>購入金額</td>
        <td>{{ number_of_years }}年後の金額</td>
      </tr>
      <tr>
        <th>{{ number_of_years }}年目</th>
        <td>{{amountOfShare}}</td>
        <td>{{ Math.round(amountOfShare * Math.pow(hoge, number_of_years)) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AssetManagementCalculate',
  data () {
    return {
      stock_price: '',
      earnings_per_share: '',
      number_of_shares: '',
      number_of_years: ''
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

    hoge: function() {
      return 1 + this.dividendYieldCalculate / 100
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
