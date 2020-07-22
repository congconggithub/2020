import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; // 数据在页面上绑定可以安全解析
@Pipe({
  name: 'keyLight'
})
export class KeyLightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(val: string, keyword: Array<string>): any { // Angular 会调用它的 transform 方法，并把要绑定的值作为第一个参数传入，其它参数会依次从第二个参数的位置开始传入。
    let tagsColor = ['#FF6565',  '#406DD1',  '#7AB0C4', '#748F63',
    '#51466E', '#7D83D9', '#05C6C9', '#0A91D4',  '#72526A', '#BB9FD2',
    '#EC8195', '#FF8768', '#D9A888',  '#965F4D',  '#A3CE97', '#D2CC9F',  '#FFCF65', '#27486C' ];

    let res = val;
    keyword = keyword.sort(this.sortNumber);
    keyword.forEach((item, i) => {
      const Reg = new RegExp(item, 'g');
      if (val) {
         res = res.replace(Reg, `<span style="color: ${tagsColor[i]};font-weight:bold;">${item}</span>`); // 将匹配到的关键字替换
      }
    })
    return this.sanitizer.bypassSecurityTrustHtml(res);
  }

  sortNumber(a , b) {
    return b.length - a.length
  }

/*  transform(val: string): any { // Angular 会调用它的 transform 方法，并把要绑定的值作为第一个参数传入，其它参数会依次从第二个参数的位置开始传入。
    let tagsColor = ['#FF6565', '#FFCF65',  '#D2CC9F', '#406DD1',  '#7AB0C4', '#748F63',
      '#51466E', '#7D83D9', '#05C6C9', '#0A91D4',  '#72526A', '#BB9FD2',
      '#EC8195', '#FF8768', '#D9A888',  '#965F4D',  '#A3CE97',   '#27486C' ];

    let str = val + ""

    if (val){
      // 拆分出所有字符串
      let res = str + ""
      let arr1 = res.split('(');
      let arr2 = [];
      arr1.forEach(item => {
        arr2.push(...item.split(')'));
      });
      arr1 = [];
      arr2.forEach(item => {
        arr1.push(...item.split('&'))
      })
      arr2 = [];
      arr1.forEach(item => {
        arr2.push(...item.split('|'))
      })
      arr1 = [];
      arr2.forEach(item => {
        arr1.push(...item.split('!'))
      })
      // 过滤空字符串
      arr2 = arr1.filter(item => {
        if(item){
          return item
        }
      })
      // 找到关键字所在索引后加入单引号替换
      let index = 0;
      arr2.forEach((item, i) => {

        // 防止重复替换，设置启始查询索引
        index = res.indexOf(item, index)
        let tmp1 = res.substr(0, index)
        let tmp2 = `'${item}'`
        let tmp3 = res.substr(index + item.length, res.length)
        res = tmp1 + tmp2 + tmp3; // 组合成新字符串
        index += item.length + 2; // 加入两个单引号的长度
      })
      res = res.replace(/\&/g, '&&').replace(/\|/g, '||')
      let right = true
      try{
        eval(`if(${res}){}`)
      }catch(res){
        right = false
        console.log(res)
      }
      if(right){
        console.log("right",arr2,str)
        let index = 0
        arr2.forEach((item, i) => {
          // 防止重复替换，设置启始查询索引
          index = str.indexOf(item, index)
          let tmp1 = str.substr(0, index)
          let tmp2 = `<a style="color: ${tagsColor[i]};font-weight:bold;">${item}</a>`
          let tmp3 = str.substr(index + item.length, str.length)
          str = tmp1 + tmp2 + tmp3; // 组合成新字符串
          index += item.length + 48; // 加入样式长度
        })
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(str);

  }*/
}
