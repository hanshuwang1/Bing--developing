// ==UserScript==
// @brief       ���ű�ԭ����Ϊhaigirl@https://greasyfork.org/zh-CN/users/805725-haigirl��ֻ����ϰʹ��vscode�����ű�������ͼ���ӹ���
// @name        Bing��ҳ�Ż�-developing
// @namespace   Bing��ҳ�Ż�
// @description Bing��ҳ�Ż���ȥ��bing��ҳ�Ĺ��ڰ�͹��ʰ��л���ǩ��ȥ���ײ��İ�Ȩ��Ϣ�͹�����ӣ�������ҳ��ֽ�л���ť��
// @author      haigirl
// @icon        https://favicon.yandex.net/favicon/v2/bing.com
// @match       *://cn.bing.com/*
// @match       https://www.bing.com/*
// @match       https://cn.bing.com/search?q=
// @match       https://cn.bing.com/chrome/newtab
// @version     0.0.0
// @license     GPL-3.0-only
// ==/UserScript==
//
//����ΪGBK����
// ����������ִ�У������޸�Bing��ҳ�Ĳ��ֺ͹���
(function() {

  // ʹ�ö�ʱ�����ҳ��������
  var timeFunction = window.setInterval(function(){loadEnd()},1);
  function loadEnd(){

    // ��ȡ��Ҫ������DOMԪ��
    var footer = document.querySelector('#footer'); // ҳ��
    var searchNav = document.querySelector('#est_switch'); // �����л���ǩ
    var searchBox = document.querySelector('.sb_form_q'); // ������
    var sbox = document.querySelector('.sbox'); // ����������
    var headline = document.querySelector('#headline'); // ҳ��ͷ��
    var hp_trivia_inner = document.querySelector('.hp_trivia_inner'); // ��ҳС֪ʶ
    var id_rh = document.querySelector('#id_rh'); // �Ƽ�����
    var id_qrcode = document.querySelector('#id_qrcode'); // �ֻ�ɨ��
    var sa_ul = document.getElementById('sa_ul'); // �������ڲ� "�����ȵ�"

    // ��ʱȥ��ҳ�������
   if (GetCurrentUrl()=="https://cn.bing.com/chrome/newtab")
   {
      document.documentElement.style.overflowY = "hidden";//�������������������޹�������ȥ�����������ҳ����ֹ�����
   }

    // ���ػ��Ƴ���Ҫ������DOMԪ��
    if (footer){
      hidenDom(footer);
    }
    if (searchNav){
      hidenDom(searchNav);
    }
    if (sbox){
      sbox.style.margin='0';
      sbox.style.top = "20%"; // ����������λ��
      sbox.style.left = "30%";
    }
    if (headline){
      hidenDom(headline);
    }
    if (hp_trivia_inner){
      hidenDom(hp_trivia_inner);
    }
    if (id_rh) {
      hidenDom(id_rh);
    }
    if (id_qrcode) {
      hidenDom(id_qrcode);
    }

    // ȥ���������ڲ� "�����ȵ�" sa_ulΪ�������ڲ� "�����ȵ�"
    if (sa_ul) {
      var sa_ul_child = sa_ul.children;

      for (var i = 0; i < sa_ul_child.length; i++)
      {
        if (sa_ul_child[i].className == 'sa_hd'||sa_ul_child[i].className =='sa_nestedList ')
        {
          for (var j = i; j < sa_ul_child.length; j++)
          {
            hidenDom(sa_ul_child[j]);
          }
          break;
        }
      }
    }
  }

  // �Ƴ�ָ��DOMԪ��
  function removeDom(dom){
    if(dom){
      dom.remove();
    }
  }

  // ����ָ��DOMԪ��
  function hidenDom(dom){
    if(dom){
      dom.style.display = 'none';
    }
  }

     //��ȡ=ǰ��ַ
    function GetCurrentUrl(){
    var loc = window.location.href;//��ȡȫ����ַ
    //var n1 = loc.length;         //��ַ���ܳ���
    var n = loc.indexOf("="); //ȡ��=�ŵ�λ��
    var url = loc.substr(0, n);//��=��ǰ�������
    //console.log(url);
    return loc;
}
  // �޸���������ʽ�ͽ���
  function SearchBoxEditor(){
    var searchbox= document.querySelector('#sb_form_q'); // ������
    var searchLabel = document.querySelector('#sb_form'); // ����������

    searchLabel.style.backgroundColor = "#FFFFFF00"; // ������������������ɫ

    // �������ȡ����ʱ����ʽ
    function SearchBoxOnFocus(){
      searchLabel.style.backgroundColor = "#FFFFFF";
    }

    // ������ʧȥ����ʱ����ʽ
    function SearchBoxOnBlur(){
      searchLabel.style.backgroundColor = "#FFFFFF00";
    }

    // ��껬��������ʱ����ʽ
    function SearchBoxOnMouseOver(){
      if(document.activeElement.id == "sb_form_q"){
        // ��������Ȼ���ڽ���״̬
        searchLabel.style.backgroundColor = "#FFFFFF";
      }else{
        searchLabel.style.backgroundColor = "#FFFFFF00";
      }
    }

    // ����뿪������ʱ����ʽ
    function SearchBoxOnMouseLeave(){
      if(document.activeElement.id == "sb_form_q"){
        // ��������Ȼ���ڽ���״̬
      }else{
        searchLabel.style.backgroundColor = "#FFFFFF00";
      }
    }

    // ���¼��������������������
    searchbox.onblur = SearchBoxOnBlur; // ʧȥ����
    searchbox.onfocus = SearchBoxOnFocus; // ��ý���
    searchbox.onclick = SearchBoxOnFocus; // ����¼�
    searchLabel.onclick = SearchBoxOnFocus; // ����¼�
    searchLabel.onmouseover = SearchBoxOnMouseOver; // ��껬��
    searchLabel.onmouseleave = SearchBoxOnMouseLeave; // ����뿪 = ʧȥ����
  }

  window.setTimeout(SearchBoxEditor, 10); // �ӳ�ִ���������޸ĺ���

})();
