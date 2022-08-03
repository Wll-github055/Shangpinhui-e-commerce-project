<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]}}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 售卖属性面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">
              {{ attrValue.split(':')[1]}}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo='tradeMarkInfo' @attrInfo='attrInfo'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合&nbsp;<span v-if="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}" style="font-size:8px"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格&nbsp;<span v-if="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}" style="font-size:8px"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg"/></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='total' :continues='5' @getPageNo='getPageNo' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters("search", { goodsList: "goodsList" }),
    
    isOne(){
      return this.searchParams.order.includes('1')
    },
    isTwo(){
      return this.searchParams.order.includes('2')
    },
    isAsc(){
      return this.searchParams.order.includes('asc')
    },
    isDesc(){
      return this.searchParams.order.includes('desc')
    },
    total(){
      return this.$store.state.search.searchList.total
    }
  },
  methods: {
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    removeCategoryName() {
      // 把带给服务器的参数置空，向服务器发请求还是会带上。但是如果设置为undefined，这个字段就不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;

      this.getData();
      // 地址栏也要相应的修改：重新进行一次路由跳转（自己跳自己）
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }

      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
    },
    tradeMarkInfo(tradeMark){
      this.searchParams.trademark=`${tradeMark.tmId}:${tradeMark.tmName}`
      this.getData()
    },
    removeTradeMark(){
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 收集平台属性
    attrInfo(attr,attrValue){
      let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重
      if(!this.searchParams.props.includes(props)) this.searchParams.props.push(props)
      this.getData()
    },
    removeAttr(idx){
      this.searchParams.props.splice(idx,1)
      this.getData()
    },
    changeOrder(flag){
      // flag代表用户点击的是综合（'1'）还是价格（'2'）
      // 或去点击之前的状态
      let orginOrder=this.searchParams.order
      let orginFlag=orginOrder.split(':')[0]
      let orginSort=orginOrder.split(':')[1]

      let newOrder=''
      if(flag===orginFlag){
        newOrder=`${flag}:${orginSort==='desc'?'asc':'desc'}`
      }else{
        newOrder=`${flag}:${'desc'}`
      }
      this.searchParams.order=newOrder
      this.getData()
    },
    getPageNo(pageNo){
      this.searchParams.pageNo=pageNo
      this.getData()
    }
  },
  watch: {
    // 监听路由信息是否发生变化，如果发生变化，则再次发起请求
    $route: {
      handler(newValue, oldValue) {
        // 注意，每次请求之前，都应该把上一次的1|2|3级分类的id置空，避免发送请求下一次时还将上一次的1|2|3级id带上的情况，影响查询结果
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;

        Object.assign(this.searchParams, this.$route.params, this.$route.query);
        // 路由参数发生变化，重新再发送一次请求
        this.getData();
      },
    },
  },
  // 获取数据之前，整理好searchParams参数
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>