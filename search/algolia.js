window.addEventListener("load",()=>{const e=()=>{const e=document.body.style;e.width="100%",e.overflow="hidden",btf.animateIn(document.getElementById("search-mask"),"to_show 0.5s"),btf.animateIn(document.querySelector("#algolia-search .search-dialog"),"titleScale 0.5s"),setTimeout(()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()},100),document.addEventListener("keydown",function e(t){"Escape"===t.code&&(a(),document.removeEventListener("keydown",e))})},a=()=>{const e=document.body.style;e.width="",e.overflow="",btf.animateOut(document.querySelector("#algolia-search .search-dialog"),"search_close .5s"),btf.animateOut(document.getElementById("search-mask"),"to_hide 0.5s")},t=()=>{document.querySelector("#search-button > .search").addEventListener("click",e)};const n=e=>{if(""===e)return"";var t=e.indexOf("<mark>");let a=t-30,n=t+120,i="",s="";return a<=0?(a=0,n=140):i="...",n>e.length?n=e.length:s="...",i+e.substring(a,n)+s};var i=GLOBAL_CONFIG.algolia;if(!(i.appId&&i.apiKey&&i.indexName))return console.error("Algolia setting is invalid!");const s=instantsearch({indexName:i.indexName,searchClient:algoliasearch(i.appId,i.apiKey),searchFunction(e){e.state.query&&e.search()}});var i=instantsearch.widgets.configure({hitsPerPage:5}),o=instantsearch.widgets.searchBox({container:"#algolia-search-input",showReset:!1,showSubmit:!1,placeholder:GLOBAL_CONFIG.algolia.languages.input_placeholder,showLoadingIndicator:!0}),l=instantsearch.widgets.hits({container:"#algolia-hits",templates:{item(e){var t=e.permalink||GLOBAL_CONFIG.root+e.path,e=e._highlightResult,a=e.contentStripTruncate?n(e.contentStripTruncate.value):e.contentStrip?n(e.contentStrip.value):e.content?n(e.content.value):"";return`
          <a href="${t}" class="algolia-hit-item-link">
          ${e.title.value||"no-title"}
          </a>
          <p class="algolia-hit-item-content">${a}</p>`},empty:function(e){return'<div id="algolia-hits-empty">'+GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/,e.query)+"</div>"}}}),r=instantsearch.widgets.stats({container:"#algolia-info > .algolia-stats",templates:{text:function(e){return"<hr>"+GLOBAL_CONFIG.algolia.languages.hits_stats.replace(/\$\{hits}/,e.nbHits).replace(/\$\{time}/,e.processingTimeMS)}}}),c=instantsearch.widgets.poweredBy({container:"#algolia-info > .algolia-poweredBy"}),d=instantsearch.widgets.pagination({container:"#algolia-pagination",totalPages:5,templates:{first:'<i class="fas fa-angle-double-left"></i>',last:'<i class="fas fa-angle-double-right"></i>',previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}});s.addWidgets([i,o,l,r,c,d]),s.start(),t(),document.getElementById("search-mask").addEventListener("click",a),document.querySelector("#algolia-search .search-close-button").addEventListener("click",a),window.addEventListener("pjax:complete",()=>{"block"===getComputedStyle(document.querySelector("#algolia-search .search-dialog")).display&&a(),t()}),window.pjax&&s.on("render",()=>{window.pjax.refresh(document.getElementById("algolia-hits"))})});