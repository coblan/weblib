export var urlparse={
    parseSearch:function (queryString) {
        if(!queryString){
            let rt = /\?(.+)$/.exec(location.href)
            if(rt){
                var queryString = rt[1]
            }else{
                var queryString = ''
            }
            
        }
        // var queryString = queryString ||  /\?(.+)$/.exec() //location.search
        if(queryString.startsWith('?')){
            var queryString=queryString.substring(1)
        }
        var params = {}
        // Split into key/value pairs
        var queries = queryString.split("&");
        // Convert the array of strings into an object
        for (var i = 0; i < queries.length; i++ ) {
            var mt = /([^=]+?)=(.+)/.exec(queries[i])
            if(mt){
                params[mt[1]] = decodeURI(mt[2]);
            }
        }
        return params;
    },
    searchfy:function (obj,pre) {
        var outstr=pre||''
        for(var x in obj){
            var value=obj[x]
            if(value===true){value='1'}
            if(value===false){value='0'}
            if(value!==''&& value!=null){
                outstr+=x.toString()+'='+ value.toString()+'&';
            }
        }
        if(outstr.endsWith('&')){
            return para_encode(outstr.slice(0,-1))
        }else if(outstr==pre){
            return ''
        }else{
            return para_encode(outstr)
        }
    },
    appendSearch:function(url,obj){
        if(!obj){
            var obj=url
            var url=location.href
        }
        if(url){
            var url_obj = this.parseURL(url)
            var search = url_obj.params
        }else{
            url=location.href
            var search=this.parseSearch()
        }
        Object.assign(search,obj)
        return url.replace(/(\?.*)|()$/,this.searchfy(search,'?'))
    },
    parseURL: function(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            search: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = decodeURI(s[1]);
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            pathname: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    },
    urlJoin(url, concat){
        var url1 = url.split('/');
        var url2 = concat.split('/');
        var url3 = [ ];
        for (var i = 0, l = url1.length; i < l; i ++) {
            if (url1[i] == '..') {
                url3.pop();
            } else if (url1[i] == '.') {
                continue;
            } else {
                url3.push(url1[i]);
            }
        }
        for (var i = 0, l = url2.length; i < l; i ++) {
            if (url2[i] == '..') {
                url3.pop();
            } else if (url2[i] == '.') {
                continue;
            } else {
                url3.push(url2[i]);
            }
        }
        return url3.join('/');
    }

}

function para_encode(para_str){
    return encodeURI(para_str).replace('+','%2B')
}