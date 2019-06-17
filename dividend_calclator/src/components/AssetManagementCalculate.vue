<!--
・とりあえず、最低限のアプリケーションはできたので、綺麗にして公開したい
・Vuetifyでform部分とtableを作り込みたい
・複数のコンポーネントを共存させることができるか？
・グラフの描画（イメージは

 -->
<template>
  <div class="calculate_section">
    <div class="calculate_section__input_area">
      <label for="stock_price">現在株価</label>
      <!-- .numberがなければ文字列として認識してしまう -->
      <input class="calculate_section__input_box" type="number" v-model.number="stock_price" placeholder="現在の株価を入力してください">円
    </div>
    <div class="calculate_section__input_area">
      <label for="earnings_per_share">1株あたり配当金</label>
      <input type="number" v-model.number="earnings_per_share" placeholder="1株あたり配当金を入力してください">円
    </div>
    <p>年間配当利回り:{{ dividendYieldCalculate }} %</p>
    <div class="calculate_section__input_area">
      <label for="number_of_shares">購入株数</label>
      <input type="number" v-model.number="number_of_shares" placeholder="購入したい株数を入力してください">株
    </div>
    <div class="calculate_section__input_area">
      <label for="number_of_years">運用する年数</label>
      <input type="number" v-model.number="number_of_years" placeholder="運用する年数を入力してください">年
    </div>
    <div class="">
      <p>{{ number_of_years }}年後には、{{ amountOfShare }}円が{{ totalAmountOfMoney }}円となります。</p>
      <p>ここから下に利回り計算後の表が出ます。</p>

      <!-- <table>
        <tr>
          <th></th>
          <td>利回り計算後の金額</td>
        </tr>
        <tr v-for="number_of_year in number_of_years">
          <th>{{ number_of_year }}年後</th>
          <td>{{ Math.round(amountOfShare * Math.pow(rateOfIncrease, number_of_year)) }}円</td>
        </tr>
      </table> -->
      <!--
      参考：https://vuetifyjs.com/ja/components/data-tables
      -->
      <v-data-table
        :headers="headers"
        :items="hoge"
        class="elevation-1"
      >
      <!-- プロパティを受け取る名前付きのスロット -->
      <!-- propertyの部分は何の文字列でもよくて、ただの名前（仮引数のようなもの） -->
      <!-- <h3 slot="title">レッサーパンダ</h3> slotは2.5までの書き方 -->
      <!-- <h3 v-slot:title>レッサーパンダ</h3> v-slotは2.6以降の書き方-->
      <!-- すべてのスロットプロパティを保持するオブジェクトの名前をpropertyとしている。つまりpropertyはオブジェクトである -->
        <template v-slot:items="property">
          <tr v-for="number_of_year in number_of_years">
            <th>{{ number_of_year }}年後</th>
            <td>{{ Math.round(amountOfShare * Math.pow(rateOfIncrease, number_of_year)) }}円</td>
          </tr>
          <!-- <tr v-for="number_of_year in number_of_years> -->
            <!-- <th>{{ number_of_year }}</th>
            <td>{{property.item.calories}}</td> -->
          <!-- </tr> -->
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
// export default {
//     data () {
//       return {
//         headers: [
//           {
//             text: 'Dessert (100g serving)',
//             align: 'left',
//             sortable: false,
//             value: 'name'
//           },
//           { text: 'Calories', value: 'calories' },
//           { text: 'Fat (g)', value: 'fat' },
//           { text: 'Carbs (g)', value: 'carbs' },
//           { text: 'Protein (g)', value: 'protein' },
//           { text: 'Iron (%)', value: 'iron' }
//         ],
//         desserts: [
//           {
//             name: 'Frozen Yogurt',
//             calories: 159,
//             fat: 6.0,
//             carbs: 24,
//             protein: 4.0,
//             iron: '1%'
//           },
//           {
//             name: 'Ice cream sandwich',
//             calories: 237,
//             fat: 9.0,
//             carbs: 37,
//             protein: 4.3,
//             iron: '1%'
//           },
//           {
//             name: 'Eclair',
//             calories: 262,
//             fat: 16.0,
//             carbs: 23,
//             protein: 6.0,
//             iron: '7%'
//           },
//           {
//             name: 'Cupcake',
//             calories: 305,
//             fat: 3.7,
//             carbs: 67,
//             protein: 4.3,
//             iron: '8%'
//           },
//           {
//             name: 'Gingerbread',
//             calories: 356,
//             fat: 16.0,
//             carbs: 49,
//             protein: 3.9,
//             iron: '16%'
//           },
//           {
//             name: 'Jelly bean',
//             calories: 375,
//             fat: 0.0,
//             carbs: 94,
//             protein: 0.0,
//             iron: '0%'
//           },
//           {
//             name: 'Lollipop',
//             calories: 392,
//             fat: 0.2,
//             carbs: 98,
//             protein: 0,
//             iron: '2%'
//           },
//           {
//             name: 'Honeycomb',
//             calories: 408,
//             fat: 3.2,
//             carbs: 87,
//             protein: 6.5,
//             iron: '45%'
//           },
//           {
//             name: 'Donut',
//             calories: 452,
//             fat: 25.0,
//             carbs: 51,
//             protein: 4.9,
//             iron: '22%'
//           },
//           {
//             name: 'KitKat',
//             calories: 518,
//             fat: 26.0,
//             carbs: 65,
//             protein: 7,
//             iron: '6%'
//           }
//         ]
//       }
//     }
//   }
export default {
  name: 'AssetManagementCalculate',
  data () {
    return {
      stock_price: null,
      earnings_per_share: null,
      number_of_shares: null,
      number_of_years: null,
      headers: [
        {
          text: '経過年数',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: '利回り計算後の金額',
          value: 'calories',
          sortable: false
        }
      ],
      hoge: [
        {
          name: 'Donut',
          calories: 518,
        }
      ]

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
<style lang="scss" scoped>

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

.calculate_section__input_area {
  margin: 12px auto;
}

.calculate_section__input_box {
  border-bottom: 2px solid #e0e0e0;
  font-size: 1.5em;
  padding: 0 16px;
  text-align: center;
  transition: .7s;
  width: 30%;

  &:hover,
  &:focus {
    border-bottom: 2px solid #2e8b57;
    outline: 0;
  }
}
</style>
