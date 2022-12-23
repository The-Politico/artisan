export default function Container({ children, showArticle }) {
  return `\
${!showArticle ? '' : `
<html lang="en" class="no-js"><!--<![endif]--><head><script type="text/javascript" src="https://m.addthis.com/live/red_lojson/300lo.json?si=636d2be5d9e56f04&amp;bkl=0&amp;bl=1&amp;pdt=395&amp;sid=636d2be5d9e56f04&amp;pub=politico.com&amp;rev=v8.28.8-wp&amp;ln=en&amp;pc=men&amp;cb=0&amp;ab=-&amp;dp=cms.politico.com&amp;fp=cms%2Fpreview%2Fnull%2F_preview%3F_cms.db.previewId%3D00000184-6273-d07e-a5fd-f67b729c0000%26_fields%3Dtrue%26_date%3D%26_csrf%3D57cf90a6-58ff-42df-b7a9-7325686b4a53&amp;fr=&amp;of=0&amp;pd=0&amp;irt=1&amp;vcl=1&amp;md=0&amp;ct=1&amp;tct=0&amp;abt=0&amp;cdn=0&amp;pi=1&amp;rb=0&amp;gen=100&amp;chr=UTF-8&amp;colc=1668099045654&amp;jsl=143489&amp;uvs=636d2bc4c8ddf791002&amp;skipb=1&amp;callback=addthis.cbs.jsonp__418870210072465050"></script><script type="text/javascript" src="https://v1.addthisedge.com/live/boost/politico.com/_ate.track.config_resp"></script><script src="https://connect.facebook.net/en_US/sdk.js?hash=dae6ae3408cf77fcb56a082c8f1ff594" async="" crossorigin="anonymous"></script><script type="text/javascript" async="" src="https://apis.google.com/js/platform.js" gapi_processed="true"></script><script id="twitter-wjs" async="" src="//platform.twitter.com/widgets.js"></script><script id="facebook-jssdk" async="" src="//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;appId=178201668917374&amp;version=v2.0"></script><script type="text/javascript" src="https://z.moatads.com/addthismoatframe568911941483/moatframe.js"></script>

    
    <meta charset="utf-8"><title>Artisan Embed Testing  - POLITICO Pro</title><meta name="brightspot.contentId" content="00000184-5a27-df5e-af8c-fb6707be0000"><meta name="brightspot.cached" content="false">
    <meta name="viewport" content="width=device-width, initial-scale=1"><meta property="og:title" content="Artisan Embed Testing">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta property="og:type" content="article">
<meta property="fb:pages" content="62317591679">
<link rel="shortcut icon" type="image/x-icon" href="https://static.politico.com/ca/9d/35a27d02462587562f9e798d0620/politico-pro.png">
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://www.politico.com/dims4/default/83bdcb7/2147483647/legacy_thumbnail/144x144/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fca%2F9d%2F35a27d02462587562f9e798d0620%2Fpolitico-pro.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://www.politico.com/dims4/default/cde6afd/2147483647/legacy_thumbnail/114x114/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fca%2F9d%2F35a27d02462587562f9e798d0620%2Fpolitico-pro.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://www.politico.com/dims4/default/5238a81/2147483647/legacy_thumbnail/72x72/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fca%2F9d%2F35a27d02462587562f9e798d0620%2Fpolitico-pro.png">
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="https://www.politico.com/dims4/default/56d5e68/2147483647/legacy_thumbnail/57x57/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fca%2F9d%2F35a27d02462587562f9e798d0620%2Fpolitico-pro.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
<link rel="icon" sizes="32x32" type="image/png" href="/favicon-32x32.png">
<link rel="icon" sizes="192x192" type="image/png" href="/android-chrome-192x192.png">
<link rel="icon" sizes="96x96" type="image/png" href="/favicon-96x96.png">
<link rel="icon" sizes="16x16" type="image/png" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="theme-color" content="#ffffff">
<meta property="og:site_name" content="POLITICO Pro">
<meta name="host" content="cms.politico.com">
<meta name="build" content="1.0.0-SNAPSHOT">

    <link rel="stylesheet" href="https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--base.js.a721a78317a0f65befbae0d80a1cf867.gz.css">
    <link rel="stylesheet" href="https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--header.js.fc4b5ba636efcf3dd3e7be40bc86dc1f.gz.css">
    <link rel="stylesheet" href="
    ">

    <script type="text/javascript" async="" src="//munchkin.marketo.net/162/munchkin.js"></script><script src="https://rules.quantcount.com/rules-p-7bhLrd63bC8jI.js" async=""></script><script type="text/javascript" async="" charset="utf-8" id="utag_200" src="https://snap.licdn.com/li.lms-analytics/insight.min.js"></script><script type="text/javascript" async="" charset="utf-8" id="utag_191" src="//munchkin.marketo.net/munchkin.js"></script><script type="text/javascript" async="" charset="utf-8" id="utag_95" src="https://secure.quantserve.com/quant.js"></script><script type="text/javascript" async="" charset="utf-8" id="utag_214" src="//tags.crwdcntrl.net/lt/c/2643/lt.min.js"></script><script src="https://usasync01.admantx.com/admantx/service?request=%7B%22decorator%22%3A%22template.politico%22%2C%22key%22%3A%22821cd7dccbf73aa71c486ecbb4b909f9c3782ab51161515edeb9cc21efd18478%22%2C%22method%22%3A%22descriptor%22%2C%22filter%22%3A%5B%22default%22%5D%2C%22mode%22%3A%22async%22%2C%22type%22%3A%22URL%22%2C%22body%22%3A%22https%253A//cms.politico.com/cms/preview/null/_preview%253F_cms.db.previewId%253D00000184-6273-d07e-a5fd-f67b729c0000%2526_fields%253Dtrue%2526_date%253D%2526_csrf%253D57cf90a6-58ff-42df-b7a9-7325686b4a53%22%7D" type="text/javascript" async=""></script><script type="text/javascript" async="" src="https://www.gstatic.com/recaptcha/releases/Ixi5IiChXmIG6rRkjUa1qXHT/recaptcha__en.js" crossorigin="anonymous" integrity="sha384-j2sah26WlMKQf8EQXBOwWyutNl4NgB7gRqS2vh6bQQwqHC1ZaweKdpbn33FwSCd8"></script><script src="//tags.tiqcdn.com/utag/politico/pro/prod/utag.js" type="text/javascript" async=""></script><script id="gpt" async="" type="text/javascript" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script><script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript">window.jQuery || document.write('<script src="https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/external-libraries/jquery-1.11.0.min.09e2302066dc95597682cbcb72b3e5b3.gz.js"></script></script>

    <script type="text/javascript" src="https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/js.min/preload.30656cb71ce4d1821ef317118aa86ed9.gz.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

    <link rel="stylesheet" href="https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--article.js.90fddc8dad09ddc17a855d4539d25794.gz.css">
    <link rel="stylesheet" href="https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--utility.js.ae674724dac481b43c3015f787aa93e9.gz.css">


    <meta http-equiv="origin-trial" content="Az6AfRvI8mo7yiW5fLfj04W21t0ig6aMsGYpIqMTaX60H+b0DkO1uDr+7BrzMcimWzv/X7SXR8jI+uvbV0IJlwYAAACFeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ=="><meta http-equiv="origin-trial" content="A+USTya+tNvDPaxUgJooz+LaVk5hPoAxpLvSxjogX4Mk8awCTQ9iop6zJ9d5ldgU7WmHqBlnQB41LHHRFxoaBwoAAACLeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ=="><meta http-equiv="origin-trial" content="A7FovoGr67TUBYbnY+Z0IKoJbbmRmB8fCyirUGHavNDtD91CiGyHHSA2hDG9r9T3NjUKFi6egL3RbgTwhhcVDwUAAACLeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXRhZ3NlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjgwNjUyNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ=="><script src="https://securepubads.g.doubleclick.net/gpt/pubads_impl_2022110301.js" async=""></script><script type="text/javascript" async="" charset="utf-8" id="utag_politico.pro_11" src="//tags.tiqcdn.com/utag/politico/pro/prod/utag.11.js?utv=ut4.46.202201181443"></script><script type="text/javascript" async="" charset="utf-8" id="utag_politico.pro_93" src="//tags.tiqcdn.com/utag/politico/pro/prod/utag.93.js?utv=ut4.46.202104221540"></script>

<script type="text/javascript" async="" charset="utf-8" id="utag_politico.pro_95" src="//tags.tiqcdn.com/utag/politico/pro/prod/utag.95.js?utv=ut4.46.201707180220"></script>

<script type="text/javascript" async="" charset="utf-8" id="utag_politico.pro_191" src="//tags.tiqcdn.com/utag/politico/pro/prod/utag.191.js?utv=ut4.46.202206021751"></script><script type="text/javascript" async="" charset="utf-8" id="utag_politico.pro_198" src="//tags.tiqcdn.com/utag/politico/pro/prod/utag.198.js?utv=ut4.46.201803011752"></script>


<script type="text/javascript" async="" charset="utf-8" id="utag_politico.pro_200" src="//tags.tiqcdn.com/utag/politico/pro/prod/utag.200.js?utv=ut4.46.201810031927"></script><script src="//static.chartbeat.com/js/chartbeat.js"></script>

<style type="text/css">

.at-icon{fill:#fff;border:0}
.at-icon-wrapper{display:inline-block;overflow:hidden}a 
.at-icon-wrapper{cursor:pointer}.at-rounded,.at-rounded-element 
.at-icon-wrapper{border-radius:12%}
.at-circular,.at-circular-element .at-icon-wrapper{border-radius:50%}
.addthis_32x32_style .at-icon{width:2pc;height:2pc}
.addthis_24x24_style .at-icon{width:24px;height:24px}
.addthis_20x20_style .at-icon{width:20px;height:20px}
.addthis_16x16_style .at-icon{width:1pc;height:1pc}
#at16lb{display:none;position:absolute;top:0;left:0;width:100%;height:100%;z-index:1001;background-color:#000;opacity:.001}
#at_complete,#at_error,#at_share,#at_success{position:static!important}.at15dn{display:none}
#at15s,#at16p,#at16p form input,#at16p label,#at16p textarea,#at_share .at_item{font-family:arial,helvetica,tahoma,verdana,sans-serif!important;font-size:9pt!important;outline-style:none;outline-width:0;line-height:1em}* html #at15s.mmborder{position:absolute!important}
#at15s.mmborder{position:fixed!important;width:250px!important}
#at15s{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpiZGBgaGAgAjAxEAlGFVJHIUCAAQDcngCUgqGMqwAAAABJRU5ErkJggg==);float:none;line-height:1em;margin:0;overflow:visible;padding:5px;text-align:left;position:absolute}
#at15s a,#at15s span{outline:0;direction:ltr;text-transform:none}
#at15s .at-label{margin-left:5px}
#at15s .at-icon-wrapper{width:1pc;height:1pc;vertical-align:middle}
#at15s .at-icon{width:1pc;height:1pc}
.at4-icon{display:inline-block;background-repeat:no-repeat;background-position:top left;margin:0;overflow:hidden;cursor:pointer}
.addthis_16x16_style .at4-icon,.addthis_default_style .at4-icon,.at4-icon,.at-16x16{width:1pc;height:1pc;line-height:1pc;background-size:1pc!important}
.addthis_32x32_style .at4-icon,.at-32x32{width:2pc;height:2pc;line-height:2pc;background-size:2pc!important}
.addthis_24x24_style .at4-icon,.at-24x24{width:24px;height:24px;line-height:24px;background-size:24px!important}
.addthis_20x20_style .at4-icon,.at-20x20{width:20px;height:20px;line-height:20px;background-size:20px!important}
.at4-icon.circular,.circular .at4-icon,.circular.aticon{border-radius:50%}
.at4-icon.rounded,.rounded .at4-icon{border-radius:4px}.at4-icon-left{float:left}
#at15s .at4-icon{text-indent:20px;padding:0;overflow:visible;white-space:nowrap;background-size:1pc;width:1pc;height:1pc;background-position:top left;display:inline-block;line-height:1pc}
.addthis_vertical_style .at4-icon,.at4-follow-container .at4-icon{margin-right:5px}
html>body #at15s{width:250px!important}
#at15s.atm{background:none!important;padding:0!important;width:10pc!important}
#at15s_inner{background:#fff;border:1px solid #fff;margin:0}
#at15s_head{position:relative;background:#f2f2f2;padding:4px;cursor:default;border-bottom:1px solid #e5e5e5}
.at15s_head_success{background:#cafd99!important;border-bottom:1px solid #a9d582!important}
.at15s_head_success a,.at15s_head_success span{color:#000!important;text-decoration:none}#at15s_brand,#at15sptx,#at16_brand{position:absolute}
#at15s_brand{top:4px;right:4px}.at15s_brandx{right:20px!important}a#at15sptx{top:4px;right:4px;text-decoration:none;color:#4c4c4c;font-weight:700}#at15sptx:hover{text-decoration:underline}#at16_brand{top:5px;right:30px;cursor:default}#at_hover{padding:4px}#at_hover .at_item,#at_share .at_item{background:#fff!important;float:left!important;color:#4c4c4c!important}#at_share .at_item .at-icon-wrapper{margin-right:5px}#at_hover .at_bold{font-weight:700;color:#000!important}#at_hover .at_item{width:7pc!important;padding:2px 3px!important;margin:1px;text-decoration:none!important}#at_hover .at_item.athov,#at_hover .at_item:focus,#at_hover .at_item:hover{margin:0!important}#at_hover .at_item.athov,#at_hover .at_item:focus,#at_hover .at_item:hover,#at_share .at_item.athov,#at_share .at_item:hover{background:#f2f2f2!important;border:1px solid #e5e5e5;color:#000!important;text-decoration:none}.ipad #at_hover .at_item:focus{background:#fff!important;border:1px solid #fff}.at15t{display:block!important;height:1pc!important;line-height:1pc!important;padding-left:20px!important;background-position:0 0;text-align:left}.addthis_button,.at15t{cursor:pointer}.addthis_toolbox a.at300b,.addthis_toolbox a.at300m{width:auto}.addthis_toolbox a{margin-bottom:5px;line-height:initial}.addthis_toolbox.addthis_vertical_style{width:200px}
.addthis_button_facebook_like .fb_iframe_widget{line-height:100%}.addthis_button_facebook_like iframe.fb_iframe_widget_lift{max-width:none}.addthis_toolbox a.addthis_button_counter,.addthis_toolbox a.addthis_button_facebook_like,.addthis_toolbox a.addthis_button_facebook_send,.addthis_toolbox a.addthis_button_facebook_share,.addthis_toolbox a.addthis_button_foursquare,.addthis_toolbox a.addthis_button_linkedin_counter,.addthis_toolbox a.addthis_button_pinterest_pinit,.addthis_toolbox a.addthis_button_tweet{display:inline-block}.addthis_toolbox span.addthis_follow_label{display:none}.addthis_toolbox.addthis_vertical_style span.addthis_follow_label{display:block;white-space:nowrap}.addthis_toolbox.addthis_vertical_style a{display:block}.addthis_toolbox.addthis_vertical_style.addthis_32x32_style a{line-height:2pc;height:2pc}.addthis_toolbox.addthis_vertical_style .at300bs{margin-right:4px;float:left}.addthis_toolbox.addthis_20x20_style span{line-height:20px}.addthis_toolbox.addthis_32x32_style span{line-height:2pc}.addthis_toolbox.addthis_pill_combo_style .addthis_button_compact .at15t_compact,.addthis_toolbox.addthis_pill_combo_style a{float:left}.addthis_toolbox.addthis_pill_combo_style a.addthis_button_tweet{margin-top:-2px}.addthis_toolbox.addthis_pill_combo_style .addthis_button_compact .at15t_compact{margin-right:4px}.addthis_default_style .addthis_separator{margin:0 5px;display:inline}div.atclear{clear:both}.addthis_default_style .addthis_separator,.addthis_default_style .at4-icon,.addthis_default_style .at300b,.addthis_default_style .at300bo,.addthis_default_style .at300bs,.addthis_default_style .at300m{float:left}.at300b img,.at300bo img{border:0}a.at300b .at4-icon,a.at300m .at4-icon{display:block}.addthis_default_style .at300b,.addthis_default_style .at300bo,.addthis_default_style .at300m{padding:0 2px}.at300b,.at300bo,.at300bs,.at300m{cursor:pointer}.addthis_button_facebook_like.at300b:hover,.addthis_button_facebook_like.at300bs:hover,.addthis_button_facebook_send.at300b:hover,.addthis_button_facebook_send.at300bs:hover{opacity:1}.addthis_20x20_style .at15t,.addthis_20x20_style .at300bs{overflow:hidden;display:block;height:20px!important;width:20px!important;line-height:20px!important}.addthis_32x32_style .at15t,.addthis_32x32_style .at300bs{overflow:hidden;display:block;height:2pc!important;width:2pc!important;line-height:2pc!important}.at300bs{overflow:hidden;display:block;background-position:0 0;height:1pc;width:1pc;line-height:1pc!important}
.addthis_default_style .at15t_compact,.addthis_default_style .at15t_expanded{margin-right:4px}#at_share .at_item{width:123px!important;padding:4px;margin-right:2px;border:1px solid #fff}#at16p{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpiZGBgaGAgAjAxEAlGFVJHIUCAAQDcngCUgqGMqwAAAABJRU5ErkJggg==);z-index:10000001;position:absolute;top:50%;left:50%;width:300px;padding:10px;margin:0 auto;margin-top:-185px;margin-left:-155px;font-family:arial,helvetica,tahoma,verdana,sans-serif;font-size:9pt;color:#5e5e5e}#at_share{margin:0;padding:0}#at16pt{position:relative;background:#f2f2f2;height:13px;padding:5px 10px}#at16pt a,#at16pt h4{font-weight:700}#at16pt h4{display:inline;margin:0;padding:0;font-size:9pt;color:#4c4c4c;cursor:default}#at16pt a{position:absolute;top:5px;right:10px;color:#4c4c4c;text-decoration:none;padding:2px}#at15sptx:focus,#at16pt a:focus{outline:thin dotted}#at15s #at16pf a{top:1px}#_atssh{width:1px!important;height:1px!important;border:0!important}.atm{width:10pc!important;padding:0;margin:0;line-height:9pt;letter-spacing:normal;font-family:arial,helvetica,tahoma,verdana,sans-serif;font-size:9pt;color:#444;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpiZGBgaGAgAjAxEAlGFVJHIUCAAQDcngCUgqGMqwAAAABJRU5ErkJggg==);padding:4px}.atm-f{text-align:right;border-top:1px solid #ddd;padding:5px 8px}.atm-i{background:#fff;border:1px solid #d5d6d6;padding:0;margin:0;box-shadow:1px 1px 5px rgba(0,0,0,.15)}
.atm-s{margin:0!important;padding:0!important}.atm-s a:focus{border:transparent;outline:0;transition:none}#at_hover.atm-s a,.atm-s a{display:block;text-decoration:none;padding:4px 10px;color:#235dab!important;font-weight:400;font-style:normal;transition:none}#at_hover.atm-s .at_bold{color:#235dab!important}#at_hover.atm-s a:hover,.atm-s a:hover{background:#2095f0;text-decoration:none;color:#fff!important}#at_hover.atm-s .at_bold{font-weight:700}#at_hover.atm-s a:hover .at_bold{color:#fff!important}.atm-s a .at-label{vertical-align:middle;margin-left:5px;direction:ltr}.at_PinItButton{display:block;width:40px;height:20px;padding:0;margin:0;background-image:url(//s7.addthis.com/static/t00/pinit00.png);background-repeat:no-repeat}.at_PinItButton:hover{background-position:0 -20px}.addthis_toolbox .addthis_button_pinterest_pinit{position:relative}.at-share-tbx-element .fb_iframe_widget span{vertical-align:baseline!important}#at16pf{height:auto;text-align:right;padding:4px 8px}.at-privacy-info{position:absolute;left:7px;bottom:7px;cursor:pointer;text-decoration:none;font-family:helvetica,arial,sans-serif;font-size:10px;line-height:9pt;letter-spacing:.2px;color:#666}.at-privacy-info:hover{color:#000}.body .wsb-social-share .wsb-social-share-button-vert{padding-top:0;padding-bottom:0}
.body .wsb-social-share.addthis_counter_style .addthis_button_tweet.wsb-social-share-button{padding-top:40px}.body .wsb-social-share.addthis_counter_style .addthis_button_facebook_like.wsb-social-share-button{padding-top:21px}@media print{#at4-follow,#at4-share,#at4-thankyou,#at4-whatsnext,#at4m-mobile,#at15s,.at4,.at4-recommended{display:none!important}}@media screen and (max-width:400px){.at4win{width:100%}}@media screen and (max-height:700px) and (max-width:400px){.at4-thankyou-inner .at4-recommended-container{height:122px;overflow:hidden}.at4-thankyou-inner .at4-recommended .at4-recommended-item:first-child{border-bottom:1px solid #c5c5c5}}</style><style type="text/css">.at-branding-logo{font-family:helvetica,arial,sans-serif;text-decoration:none;font-size:10px;display:inline-block;margin:2px 0;letter-spacing:.2px}.at-branding-logo .at-branding-icon{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////+GlNUkcc1QAAAB1JREFUeNpiYIQDBjQmAwMmkwEM0JnY1WIxFyDAABGeAFEudiZsAAAAAElFTkSuQmCC")}.at-branding-logo .at-branding-icon,.at-branding-logo .at-privacy-icon{display:inline-block;height:10px;width:10px;margin-left:4px;margin-right:3px;margin-bottom:-1px;background-repeat:no-repeat}.at-branding-logo .at-privacy-icon{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAKCAMAAABR24SMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhQTFRF8fr9ot/xXcfn2/P5AKva////////AKTWodjhjAAAAAd0Uk5T////////ABpLA0YAAAA6SURBVHjaJMzBDQAwCAJAQaj7b9xifV0kUKJ9ciWxlzWEWI5gMF65KUTv0VKkjVeTerqE/x7+9BVgAEXbAWI8QDcfAAAAAElFTkSuQmCC")}
.at-branding-logo span{text-decoration:none}.at-branding-logo .at-branding-addthis,.at-branding-logo .at-branding-powered-by{color:#666}.at-branding-logo .at-branding-addthis:hover{color:#333}.at-cv-with-image .at-branding-addthis,.at-cv-with-image .at-branding-addthis:hover{color:#fff}a.at-branding-logo:visited{color:initial}.at-branding-info{display:inline-block;padding:0 5px;color:#666;border:1px solid #666;border-radius:50%;font-size:10px;line-height:9pt;opacity:.7;transition:all .3s ease;text-decoration:none}.at-branding-info span{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.at-branding-info:before{content:'i';font-family:Times New Roman}.at-branding-info:hover{color:#0780df;border-color:#0780df}</style><script type="text/javascript" async="" charset="utf-8" id="tealium_visitor_service_198main" src="https://visitor-service-us-west-2.tealiumiq.com/politico/main/0180f7760b91001e706db899ea1005079005107100ac8?callback=utag.ut%5B%22writevamain%22%5D&amp;rnd=1668099045324"></script><style type="text/css" data-fbcssmodules="css:fb.css.base css:fb.css.dialog css:fb.css.iframewidget css:fb.css.customer_chat_plugin_iframe">.fb_hidden{position:absolute;top:-10000px;z-index:10001}
.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:'lucida grande', tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}@keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}
.fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:'lucida grande', tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}@keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}
.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_dialog_advanced{border-radius:8px;padding:10px}.fb_dialog_content{background:#fff;color:#373737}.fb_dialog_close_icon{background:url(https://z-m-static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{left:5px;right:auto;top:5px}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(https://z-m-static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(https://z-m-static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https://z-m-static.xx.fbcdn.net/rsrc.php/v3/yd/r/Cou7n-nqK52.gif) no-repeat 5px 50%;float:left;padding:5px 0 7px 26px}
body.fb_hidden{height:100%;left:0;margin:0;overflow:visible;position:absolute;top:-10000px;transform:none;width:100%}.fb_dialog.fb_dialog_mobile.loading{background:url(https://z-m-static.xx.fbcdn.net/rsrc.php/v3/ya/r/3rhSv5V8j3o.gif) white no-repeat 50% 50%;min-height:100%;min-width:100%;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{background:none;height:auto;min-height:initial;min-width:initial;width:auto}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100%}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{clear:both;color:#fff;display:block;font-size:18px;padding-top:20px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .4);bottom:0;left:0;min-height:100%;position:absolute;right:0;top:0;width:100%;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_mobile .fb_dialog_iframe{position:sticky;top:0}.fb_dialog_content .dialog_header{background:linear-gradient(from(#738aba), to(#2c4987));border-bottom:1px solid;border-color:#043b87;box-shadow:white 0 1px 1px -1px inset;color:#fff;font:bold 14px Helvetica, sans-serif;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{height:43px;width:100%}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:linear-gradient(from(#4267B2), to(#2a4887));background-clip:padding-box;border:1px solid #29487d;border-radius:3px;display:inline-block;line-height:18px;margin-top:3px;max-width:85px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{background:none;border:none;color:#fff;font:bold 12px Helvetica, sans-serif;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}
.fb_dialog_content .dialog_content{background:url(https://z-m-static.xx.fbcdn.net/rsrc.php/v3/y9/r/jKEcVPZFk-2.gif) no-repeat 50% 50%;border:1px solid #4a4a4a;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f5f6f7;border:1px solid #4a4a4a;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https://z-m-static.xx.fbcdn.net/rsrc.php/v3/yD/r/t-wz8gw1xG1.png);background-position:50% 50%;background-repeat:no-repeat;height:24px;width:24px}@keyframes rotateSpinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100%}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100%}
.fb_mpn_mobile_landing_page_slide_out{animation-duration:200ms;animation-name:fb_mpn_landing_page_slide_out;transition-timing-function:ease-in}.fb_mpn_mobile_landing_page_slide_out_from_left{animation-duration:200ms;animation-name:fb_mpn_landing_page_slide_out_from_left;transition-timing-function:ease-in}.fb_mpn_mobile_landing_page_slide_up{animation-duration:500ms;animation-name:fb_mpn_landing_page_slide_up;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_in{animation-duration:300ms;animation-name:fb_mpn_bounce_in;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_out{animation-duration:300ms;animation-name:fb_mpn_bounce_out;transition-timing-function:ease-in}.fb_mpn_mobile_bounce_out_v2{animation-duration:300ms;animation-name:fb_mpn_fade_out;transition-timing-function:ease-in}.fb_customer_chat_bounce_in_v2{animation-duration:300ms;animation-name:fb_bounce_in_v2;transition-timing-function:ease-in}
.fb_customer_chat_bounce_in_from_left{animation-duration:300ms;animation-name:fb_bounce_in_from_left;transition-timing-function:ease-in}.fb_customer_chat_bounce_out_v2{animation-duration:300ms;animation-name:fb_bounce_out_v2;transition-timing-function:ease-in}.fb_customer_chat_bounce_out_from_left{animation-duration:300ms;animation-name:fb_bounce_out_from_left;transition-timing-function:ease-in}.fb_invisible_flow{display:inherit;height:0;overflow-x:hidden;width:0}@keyframes fb_mpn_landing_page_slide_out{0%{margin:0 12px;width:100% - 24px}60%{border-radius:18px}100%{border-radius:50%;margin:0 24px;width:60px}}@keyframes fb_mpn_landing_page_slide_out_from_left{0%{left:12px;width:100% - 24px}60%{border-radius:18px}100%{border-radius:50%;left:12px;width:60px}}@keyframes fb_mpn_landing_page_slide_up{0%{bottom:0;opacity:0}100%{bottom:24px;opacity:1}}@keyframes fb_mpn_bounce_in{0%{opacity:.5;top:100%}100%{opacity:1;top:0}}@keyframes fb_mpn_fade_out{0%{bottom:30px;opacity:1}100%{bottom:0;opacity:0}}@keyframes fb_mpn_bounce_out{0%{opacity:1;top:0}100%{opacity:.5;top:100%}}@keyframes fb_bounce_in_v2{0%{opacity:0;transform:scale(0, 0);transform-origin:bottom right}50%{transform:scale(1.03, 1.03);transform-origin:bottom right}100%{opacity:1;transform:scale(1, 1);transform-origin:bottom right}}
@keyframes fb_bounce_in_from_left{0%{opacity:0;transform:scale(0, 0);transform-origin:bottom left}50%{transform:scale(1.03, 1.03);transform-origin:bottom left}100%{opacity:1;transform:scale(1, 1);transform-origin:bottom left}}@keyframes fb_bounce_out_v2{0%{opacity:1;transform:scale(1, 1);transform-origin:bottom right}100%{opacity:0;transform:scale(0, 0);transform-origin:bottom right}}@keyframes fb_bounce_out_from_left{0%{opacity:1;transform:scale(1, 1);transform-origin:bottom left}100%{opacity:0;transform:scale(0, 0);transform-origin:bottom left}}
@keyframes slideInFromBottom{0%{opacity:.1;transform:translateY(100%)}100%{opacity:1;transform:translateY(0)}}@keyframes slideInFromBottomDelay{0%{opacity:0;transform:translateY(100%)}97%{opacity:0;transform:translateY(100%)}100%{opacity:1;transform:translateY(0)}}
</style>
<script type="text/javascript" charset="utf-8" async="" src="https://s7.addthis.com/static/layers.fa6cd1947ce26e890d3d.js"></script>
<style type="text/css">
.at-share-dock.atss{top:auto;left:0;right:0;bottom:0;width:100%;max-width:100%;z-index:1000200;box-shadow:0 0 1px 1px #e2dfe2}.at-share-dock.at-share-dock-zindex-hide{z-index:-1!important}.at-share-dock.atss-top{bottom:auto;top:0}.at-share-dock a{width:auto;transition:none;color:#fff;text-decoration:none;box-sizing:content-box;-webkit-box-sizing:content-box;-moz-box-sizing:content-box}
.at-share-dock a:hover{width:auto}.at-share-dock .at4-count{height:43px;padding:5px 0 0;line-height:20px;background:#fff;font-family:Helvetica neue,arial}.at-share-dock .at4-count span{width:100%}.at-share-dock .at4-count .at4-share-label{color:#848484;font-size:10px;letter-spacing:1px}.at-share-dock .at4-count .at4-counter{top:2px;position:relative;display:block;color:#222;font-size:22px}.at-share-dock.at-shfs-medium .at4-count{height:36px;line-height:1pc;padding-top:4px}.at-share-dock.at-shfs-medium .at4-count .at4-counter{font-size:18px}.at-share-dock.at-shfs-medium .at-share-btn .at-icon-wrapper,.at-share-dock.at-shfs-medium a .at-icon-wrapper{padding:6px 0}
.at-share-dock.at-shfs-small .at4-count{height:26px;line-height:1;padding-top:3px}.at-share-dock.at-shfs-small .at4-count .at4-share-label{font-size:8px}.at-share-dock.at-shfs-small .at4-count .at4-counter{font-size:14px}.at-share-dock.at-shfs-small .at-share-btn .at-icon-wrapper,.at-share-dock.at-shfs-small a .at-icon-wrapper{padding:4px 0}</style><style type="text/css">div.at-share-close-control.ats-dark,div.at-share-open-control-left.ats-dark,div.at-share-open-control-right.ats-dark{background:#262b30}div.at-share-close-control.ats-light,div.at-share-open-control-left.ats-light,div.at-share-open-control-right.ats-light{background:#fff}div.at-share-close-control.ats-gray,div.at-share-open-control-left.ats-gray,div.at-share-open-control-right.ats-gray{background:#f2f2f2}.atss{position:fixed;top:20%;width:3pc;z-index:100020;background:none}.at-share-close-control{position:relative;width:3pc;overflow:auto}.at-share-open-control-left{position:fixed;top:20%;z-index:100020;left:0;width:22px}.at-share-close-control .at4-arrow.at-left{float:right}.atss-left{left:0;float:left;right:auto}.atss-right{left:auto;float:right;right:0}.atss-right.at-share-close-control .at4-arrow.at-right{position:relative;right:0;overflow:auto}.atss-right.at-share-close-control .at4-arrow{float:left}.at-share-open-control-right{position:fixed;top:20%;z-index:100020;right:0;width:22px;float:right}.atss-right .at-share-close-control .at4-arrow{float:left}.atss.atss-right a{float:right}.atss.atss-right .at4-share-title{float:right;overflow:hidden}.atss .at-share-btn,.atss a{position:relative;display:block;width:3pc;margin:0;outline-offset:-1px;text-align:center;float:left;transition:width .15s ease-in-out;overflow:hidden;background:#e8e8e8;z-index:100030;cursor:pointer}.at-share-btn::-moz-focus-inner{border:0;padding:0}.atss-right .at-share-btn{float:right}.atss .at-share-btn{border:0;padding:0}.atss .at-share-btn:focus,.atss .at-share-btn:hover,.atss a:focus,.atss a:hover{width:4pc}.atss .at-share-btn .at-icon-wrapper,.atss a .at-icon-wrapper{display:block;padding:8px 0}.atss .at-share-btn:last-child,.atss a:last-child{border:none}
.atss .at-share-btn span .at-icon,.atss a span .at-icon{position:relative;top:0;left:0;display:block;background-repeat:no-repeat;background-position:50% 50%;width:2pc;height:2pc;line-height:2pc;border:none;padding:0;margin:0 auto;overflow:hidden;cursor:pointer;cursor:hand}.at4-share .at-custom-sidebar-counter{font-family:Helvetica neue,arial;vertical-align:top;margin-right:4px;display:inline-block;text-align:center}
.at4-share .at-custom-sidebar-count{font-size:17px;line-height:1.25em;color:#222}.at4-share .at-custom-sidebar-text{font-size:9px;line-height:1.25em;color:#888;letter-spacing:1px}.at4-share .at4-share-count-container{position:absolute;left:0;right:auto;top:auto;bottom:0;width:100%;color:#fff;background:inherit}
.at4-share .at4-share-count,.at4-share .at4-share-count-container{line-height:1pc;font-size:10px}.at4-share .at4-share-count{text-indent:0;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:200;width:100%;height:1pc}.at4-share .at4-share-count-anchor{padding-bottom:8px;text-decoration:none;transition:padding .15s ease-in-out .15s,width .15s ease-in-out}
</style>
<style type="text/css">
#at4-drawer-outer-container{top:0;width:20pc;position:fixed}#at4-drawer-outer-container.at4-drawer-inline{position:relative}#at4-drawer-outer-container.at4-drawer-inline.at4-drawer-right{float:right;right:0;left:auto}#at4-drawer-outer-container.at4-drawer-inline.at4-drawer-left{float:left;left:0;right:auto}
#at4-drawer-outer-container.at4-drawer-shown,#at4-drawer-outer-container.at4-drawer-shown *{z-index:999999}#at4-drawer-outer-container,#at4-drawer-outer-container .at4-drawer-outer,#at-drawer{height:100%;overflow-y:auto;overflow-x:hidden}.at4-drawer-push-content-right-back{position:relative;right:0}
.at4-drawer-push-content-right{position:relative;left:20pc!important}.at4-drawer-push-content-left-back{position:relative;left:0}.at4-drawer-push-content-left{position:relative;right:20pc!important}#at4-drawer-outer-container.at4-drawer-right{left:auto;right:-20pc}#at4-drawer-outer-container.at4-drawer-left{right:auto;left:-20pc}
#at4-drawer-outer-container.at4-drawer-shown.at4-drawer-right{left:auto;right:0}
#at4-drawer-outer-container.at4-drawer-shown.at4-drawer-left{right:auto;left:0}
#at-drawer{top:0;z-index:9999999;height:100%;animation-duration:.4s}#at-drawer.drawer-push.at-right{right:-20pc}#at-drawer.drawer-push.at-left{left:-20pc}#at-drawer .at-recommended-label{padding:0 0 0 20px;color:#999;line-height:3pc;font-size:18px;font-weight:300;cursor:default}
#at-drawer-arrow{width:30px;height:5pc}#at-drawer-arrow.ats-dark{background:#262b30}
#at-drawer-arrow.ats-gray{background:#f2f2f2}#at-drawer-open-arrow{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAABcCAYAAAC1OT8uAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3ODNCQjdERUQ3QjExRTM5NjFGRUZBODc3MTIwMTNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3ODNCQjdFRUQ3QjExRTM5NjFGRUZBODc3MTIwMTNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTc4M0JCN0JFRDdCMTFFMzk2MUZFRkE4NzcxMjAxM0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTc4M0JCN0NFRDdCMTFFMzk2MUZFRkE4NzcxMjAxM0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kstzCAAAB4ElEQVR42uyWv0oDQRDGb9dYimgVjliID2Ca9AGfwtZob2Grja1PIFj7EhGCYK99VPBPOkVMp8X5rc6FeN7dfjOksMjAxwXZ3667OzvfLKRr682l5ZV9aDh+fxsnRHhoDzqGLjFBi4XOoFtoAxowoB893o/w7WpAl/+QgQMBwwRdTPhUC2lAV/wDA7qy5WOgq9psHejqTqkKdLE7KYCv0JZjMgBgB58raBG6mP1K6j2pT099T+qMUOeeOss1wDcEIA1PnQXy576rAUI0oFMoC7VCnn40Gs8Pd4lAiXNUKmJ0lh1mPzGEWiyUCqAGW3Pwv4IvUJsFO9CHgP3Zr6Te0xwgAf3LxaAjS241pbikCRkOg+nSJdV4p8HOPl3vvRYI5dtrgVDvvcWovcWovcWovcWovcWovcWovQChWNywNpqvdAKtQp/QNmPUIQ6kwwqt2Xmsxf6GMPM1Pptsbz45CPmXqKb+15Gz4J/LZcDSNIqBlQlbB0afe1mmUDWiCNKFZRq0VKMeXY1CTDq2sJLWsCmoaBBRqNRR6qBKC6qCaj2rDIqaXBGiXHEaom00h1S+K3fVlr6HNuqgvgCh0+owt21bybQn8+mZ78mcEebcM2e5+T2ZX24ZqCph0qn1vgQYAJ/KDpLQr2tPAAAAAElFTkSuQmCC);background-repeat:no-repeat;width:13px;height:23px;margin:28px 0 0 8px}.at-left 
#at-drawer-open-arrow{background-position:0 -46px}.ats-dark #at-drawer-open-arrow{background-position:0 -23px}.ats-dark.at-left #at-drawer-open-arrow{background-position:0 -69px}
#at-drawer-arrow.at4-drawer-modern-browsers{position:fixed;top:40%;background-repeat:no-repeat;background-position:0 0!important;z-index:9999999}
.at4-drawer-inline #at-drawer-arrow{position:absolute}#at-drawer-arrow.at4-drawer-modern-browsers.at-right{right:0}#at-drawer-arrow.at4-drawer-modern-browsers.at-left{left:0}
.at4-drawer-push-animation-left{transition:left .4s ease-in-out .15s}
.at4-drawer-push-animation-right{transition:right .4s ease-in-out .15s}#at-drawer.drawer-push.at4-drawer-push-animation-right{right:0}#at-drawer.drawer-push.at4-drawer-push-animation-right-back{right:-20pc!important}#at-drawer.drawer-push.at4-drawer-push-animation-left{left:0}
#at-drawer.drawer-push.at4-drawer-push-animation-left-back{left:-20pc!important}#at-drawer .at4-closebutton.drawer-close{content:'X';color:#999;display:block;position:absolute;margin:0;top:0;right:0;width:3pc;height:45px;line-height:45px;overflow:hidden;opacity:.5}
#at-drawer.ats-dark .at4-closebutton.drawer-close{color:#fff}#at-drawer .at4-closebutton.drawer-close:hover{opacity:1}#at-drawer.ats-dark.at4-recommended .at4-logo-container a{color:#666}#at-drawer.at4-recommended .at4-recommended-vertical{padding:0}#at-drawer.at4-recommended .at4-recommended-item .sponsored-label{margin:2px 0 0 21px;color:#ddd}
#at-drawer.at4-recommended .at4-recommended-vertical .at4-recommended-item{position:relative;padding:0;width:20pc;height:180px;margin:0}#at-drawer.at4-recommended .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-img a:after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.65);z-index:1000000;transition:all .2s ease-in-out}
#at-drawer.at4-recommended .at4-recommended-vertical .at4-recommended-item.at-hover .at4-recommended-item-img a:after{background:rgba(0,0,0,.8)}
#at-drawer .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-img,#at-drawer .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-img a,#at-drawer .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-img img{width:20pc;height:180px;float:none}
#at-drawer .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-caption{width:100%;position:absolute;bottom:0;left:0;height:70px}#at-drawer .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-caption .at-h4{color:#fff;position:absolute;height:52px;top:0;left:20px;right:20px;margin:0;padding:0;line-height:25px;font-size:20px;font-weight:600;z-index:1000001;text-decoration:none;text-transform:none}#at-drawer.at4-recommended .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-caption .at-h4 a:hover{text-decoration:none}
#at-drawer.at4-recommended .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-caption .at-h4 a:link{color:#fff}#at-drawer.at4-recommended .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-caption small{position:absolute;top:auto;bottom:10px;left:20px;width:auto;color:#ccc}
#at-drawer.at4-recommended .at4-logo-container{margin-left:20px}#at-drawer.ats-dark.at4-recommended .at4-logo-container a:hover{color:#fff}#at-drawer.at4-recommended .at-logo{margin:0}</style><style type="text/css">.at4-follow.at-mobile{display:none!important}.at4-follow{position:fixed;top:0;right:0;font-weight:400;color:#666;cursor:default;z-index:10001}
.at4-follow .at4-follow-inner{position:relative;padding:10px 24px 10px 15px}.at4-follow-inner,.at-follow-open-control{border:0 solid #c5c5c5;border-width:1px 0 1px 1px;margin-top:-1px}.at4-follow .at4-follow-container{margin-left:9pt}.at4-follow.at4-follow-24 .at4-follow-container{height:24px;line-height:23px;font-size:13px}.at4-follow.at4-follow-32 .at4-follow-container{width:15pc;height:2pc;line-height:2pc;font-size:14px}
.at4-follow .at4-follow-container .at-follow-label{display:inline-block;height:24px;line-height:24px;margin-right:10px;padding:0;cursor:default;float:left}.at4-follow .at4-follow-container .at-icon-wrapper{height:24px;width:24px}.at4-follow.ats-transparent .at4-follow-inner,.at-follow-open-control.ats-transparent{border-color:transparent}
.at4-follow.ats-dark .at4-follow-inner,.at-follow-open-control.ats-dark{background:#262b30;border-color:#000;color:#fff}.at4-follow.ats-dark .at-follow-close-control{background-color:#262b30}
.at4-follow.ats-light .at4-follow-inner{background:#fff;border-color:#c5c5c5}.at4-follow.ats-gray .at4-follow-inner,.at-follow-open-control.ats-gray{background:#f2f2f2;border-color:#c5c5c5}.at4-follow.ats-light .at4-follow-close-control,.at-follow-open-control.ats-light{background:#e5e5e5}.at4-follow .at4-follow-inner .at4-follow-close-control{position:absolute;top:0;bottom:0;left:0;width:20px;cursor:pointer;display:none}.at4-follow .at4-follow-inner .at4-follow-close-control div{display:block;line-height:20px;text-indent:-9999em;margin-top:calc(50% + 1px);overflow:hidden}
.at-follow-open-control div.at4-arrow.at-left{background-position:0 -2px}.at-follow-open-control{position:fixed;height:35px;top:0;right:0;padding-top:10px;z-index:10002}.at-follow-btn{margin:0 5px 5px 0;padding:0;outline-offset:-1px;display:inline-block;box-sizing:content-box;transition:all .2s ease-in-out}
.at-follow-btn:focus,.at-follow-btn:hover{transform:translateY(-4px)}.at4-follow-24 .at-follow-btn{height:25px;line-height:0;width:25px}
</style>
<style type="text/css">
.at-follow-tbx-element .at300b,.at-follow-tbx-element .at300m{display:inline-block;width:auto;padding:0;margin:0 2px 5px;outline-offset:-1px;transition:all .2s ease-in-out}
.at-follow-tbx-element .at300b:focus,.at-follow-tbx-element .at300b:hover,.at-follow-tbx-element .at300m:focus,.at-follow-tbx-element .at300m:hover{transform:translateY(-4px)}
.at-follow-tbx-element .addthis_vertical_style .at300b,.at-follow-tbx-element .addthis_vertical_style .at300m{display:block}.at-follow-tbx-element .addthis_vertical_style .at300b .addthis_follow_label,.at-follow-tbx-element .addthis_vertical_style .at300b .at-icon-wrapper,.at-follow-tbx-element .addthis_vertical_style .at300m .addthis_follow_label,.at-follow-tbx-element .addthis_vertical_style .at300m .at-icon-wrapper{display:inline-block;vertical-align:middle;margin-right:5px}.at-follow-tbx-element .addthis_vertical_style .at300b:focus,.at-follow-tbx-element .addthis_vertical_style .at300b:hover,.at-follow-tbx-element .addthis_vertical_style .at300m:focus,.at-follow-tbx-element .addthis_vertical_style .at300m:hover{transform:none}
</style>
<style type="text/css">
.at4-jumboshare .at-share-btn{display:inline-block;margin-right:13px;margin-top:13px}.at4-jumboshare .at-share-btn .at-icon{float:left}
.at4-jumboshare .at-share-btn .at300bs{display:inline-block;float:left;cursor:pointer}.at4-jumboshare .at4-mobile .at-share-btn .at-icon,.at4-jumboshare .at4-mobile .at-share-btn .at-icon-wrapper{margin:0;padding:0}.at4-jumboshare .at4-mobile .at-share-btn{padding:0}
.at4-jumboshare .at4-mobile .at-share-btn .at-label{display:none}.at4-jumboshare .at4-count{font-size:60px;line-height:60px;font-family:Helvetica neue,arial;font-weight:700}
.at4-jumboshare .at4-count-container{display:table-cell;text-align:center;min-width:200px;vertical-align:middle;border-right:1px solid #ccc;padding-right:20px}.at4-jumboshare .at4-share-container{display:table-cell;vertical-align:middle;padding-left:20px}.at4-jumboshare .at4-share-container.at-share-tbx-element{padding-top:0}.at4-jumboshare .at4-title{position:relative;font-size:18px;line-height:18px;bottom:2px}
.at4-jumboshare .at4-spacer{height:1px;display:block;visibility:hidden;opacity:0}.at4-jumboshare .at-share-btn{display:inline-block;margin:0 2px;line-height:0;padding:0;overflow:hidden;text-decoration:none;text-transform:none;color:#fff;cursor:pointer;transition:all .2s ease-in-out;border:0;background-color:transparent}.at4-jumboshare .at-share-btn:focus,.at4-jumboshare .at-share-btn:hover{transform:translateY(-4px);color:#fff;text-decoration:none}.at4-jumboshare .at-label{font-family:helvetica neue,helvetica,arial,sans-serif;font-size:9pt;padding:0 15px 0 0;margin:0;height:2pc;line-height:2pc;background:none}.at4-jumboshare .at-share-btn:hover,.at4-jumboshare .at-share-btn:link{text-decoration:none}
.at4-jumboshare .at-share-btn::-moz-focus-inner{border:0;padding:0}.at4-jumboshare.at-mobile .at-label{display:none}</style><style type="text/css">.at4-recommendedbox-outer-container{display:inline}.at4-recommended-outer{position:static}.at4-recommended{top:20%;margin:0;text-align:center;font-weight:400;font-size:13px;line-height:17px;color:#666}
.at4-recommended.at-inline .at4-recommended-horizontal{text-align:left}.at4-recommended-recommendedbox{padding:0;z-index:inherit}.at4-recommended-recommended{padding:40px 0}.at4-recommended-horizontal{max-height:340px}.at4-recommended.at-medium .at4-recommended-horizontal{max-height:15pc}.at4-recommended.at4-minimal.at-medium .at4-recommended-horizontal{padding-top:10px;max-height:230px}
.at4-recommended-text-only .at4-recommended-horizontal{max-height:130px}.at4-recommended-horizontal{padding-top:5px;overflow-y:hidden}
.at4-minimal{background:none;color:#000;border:none!important;box-shadow:none!important}@media screen and (max-width:900px){.at4-recommended-horizontal .at4-recommended-item,.at4-recommended-horizontal .at4-recommended-item .at4-recommended-item-img{width:15pc}}
.at4-recommended.at4-minimal .at4-recommended-horizontal .at4-recommended-item .at4-recommended-item-caption{padding:0 0 10px}.at4-recommended.at4-minimal .at4-recommended-horizontal .at4-recommended-item-caption{padding:20px 0 0!important}
.addthis-smartlayers .at4-recommended .at-h3.at-recommended-label{margin:0;padding:0;font-weight:300;font-size:18px;line-height:24px;color:#464646;width:100%;display:inline-block;zoom:1}.addthis-smartlayers .at4-recommended.at-inline .at-h3.at-recommended-label{text-align:left}
#at4-thankyou .addthis-smartlayers .at4-recommended.at-inline .at-h3.at-recommended-label{text-align:center}
.at4-recommended .at4-recommended-item{display:inline-block;zoom:1;position:relative;background:#fff;border:1px solid #c5c5c5;width:200px;margin:10px}.addthis_recommended_horizontal .at4-recommended-item{border:none}
.at4-recommended .at4-recommended-item .sponsored-label{color:#666;font-size:9px;position:absolute;top:-20px}
.at4-recommended .at4-recommended-item-img .at-tli,.at4-recommended .at4-recommended-item-img a{position:absolute;left:0}.at4-recommended.at-inline .at4-recommended-horizontal .at4-recommended-item{margin:10px 20px 0 0}
.at4-recommended.at-medium .at4-recommended-horizontal .at4-recommended-item{margin:10px 10px 0 0}.at4-recommended.at-medium .at4-recommended-item{width:140px;overflow:hidden}
.at4-recommended .at4-recommended-item .at4-recommended-item-img{position:relative;text-align:center;width:100%;height:200px;line-height:0;overflow:hidden}.at4-recommended .at4-recommended-item .at4-recommended-item-img a{display:block;width:100%;height:200px}.at4-recommended.at-medium .at4-recommended-item .at4-recommended-item-img,.at4-recommended.at-medium .at4-recommended-item .at4-recommended-item-img a{height:140px}.at4-recommended .at4-recommended-item .at4-recommended-item-img img{position:absolute;top:0;left:0;min-height:0;min-width:0;max-height:none;max-width:none;margin:0;padding:0}
.at4-recommended .at4-recommended-item .at4-recommended-item-caption{height:74px;overflow:hidden;padding:20px;text-align:left;-ms-box-sizing:content-box;-o-box-sizing:content-box;box-sizing:content-box}.at4-recommended.at-medium .at4-recommended-item .at4-recommended-item-caption{height:50px;padding:15px}
.at4-recommended .at4-recommended-item .at4-recommended-item-caption .at-h4{height:54px;margin:0 0 5px;padding:0;overflow:hidden;word-wrap:break-word;font-size:14px;font-weight:400;line-height:18px;text-align:left}.at4-recommended.at-medium .at4-recommended-item .at4-recommended-item-caption .at-h4{font-size:9pt;line-height:1pc;height:33px}.at4-recommended .at4-recommended-item:hover .at4-recommended-item-caption .at-h4{text-decoration:underline}.at4-recommended a:link,.at4-recommended a:visited{text-decoration:none;color:#464646}.at4-recommended .at4-recommended-item .at4-recommended-item-caption .at-h4 a:hover{text-decoration:underline;color:#000}
.at4-recommended .at4-recommended-item .at4-recommended-item-caption small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;color:#666}.at4-recommended.at-medium .at4-recommended-item .at4-recommended-item-caption small{font-size:9px}.at4-recommended .at4-recommended-vertical{padding:15px 0 0}.at4-recommended .at4-recommended-vertical .at4-recommended-item{display:block;width:auto;max-width:100%;height:60px;border:none;margin:0 0 15px;box-shadow:none;background:none}
.at4-recommended-vertical .at4-recommended-item .at4-recommended-item-img,.at4-recommended-vertical .at4-recommended-item .at4-recommended-item-img img{width:60px;height:60px;float:left}.at4-recommended-vertical .at4-recommended-item .at4-recommended-item-caption{border-top:none;margin:0;height:60px;padding:3px 5px}
.at4-recommended .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-caption .at-h4{height:38px;margin:0}.at4-recommended .at4-recommended-vertical .at4-recommended-item .at4-recommended-item-caption small{position:absolute;bottom:0}.at4-recommended .at-recommended-label.at-vertical{text-align:left}
.at4-no-image-light-recommended,.at4-no-image-minimal-recommended{background-color:#f2f2f2!important}
.at4-no-image-gray-recommended{background-color:#e6e6e5!important}
.at4-no-image-dark-recommended{background-color:#4e555e!important}
.at4-recommended .at4-recommended-item-placeholder-img{background-repeat:no-repeat!important;background-position:center!important;width:100%!important;height:100%!important}
.at4-recommended-horizontal .at4-no-image-dark-recommended .at4-recommended-item-placeholder-img{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAfCAYAAACCox+xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFNUUyQTg3MTI0RDExRTM4NzAwREJDRjlCQzAyMUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFNUUyQTg4MTI0RDExRTM4NzAwREJDRjlCQzAyMUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUU1RTJBODUxMjREMTFFMzg3MDBEQkNGOUJDMDIxRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUU1RTJBODYxMjREMTFFMzg3MDBEQkNGOUJDMDIxRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6oCfPiAAABfUlEQVR42uyWTU/DMAyGm3bdBxp062hHe+PC//9HCIkDYpNAO7CPAuWN5Eohyhpno2GHWqq8pO78xHHsiLquH4L/l6cwuBAZaOPKs//YBFIJIR59UiAt7huYi90aE/UQakTDLaL26RUEAAJqiefm93T9Bpj1X4O0bY0OIUXCpYBJvYDAUWyAUCWliHGTcnpqRMaM72ImRAJVknYG+eb4YEDIBeU0zGnsBLK1ODogYSsLhDwIJeVVk18lzfNA4ERGZNXi59UCIQhiYDilpSm/jp4awLxDvWhlf4/nGe8+LLuSt+SZul28ggaHG6gNVhDR+IuRFzOoxGKWwG7vVFm5AAQxgcqYpzrjFjR9zwPH5LSuT7XlNr2MQm5LzqjLpncNNaM+s8M27Y60g3FwhoSMzrtUQllgLtRs5pZ2cB4IhbvQbGRZv1NsrhyS8+SI5Mo9RJWpjAI1xqKL+0iEP180vy214JbeR12AyOgsHI7e0NfFyKv0ID1ID+IqPwIMAOeljGQOryBmAAAAAElFTkSuQmCC)!important}
.at4-recommended-vertical .at4-no-image-dark-recommended .at4-recommended-item-placeholder-img{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzREMyNTM2MTI0RjExRTM4NzAwREJDRjlCQzAyMUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzREMyNTM3MTI0RjExRTM4NzAwREJDRjlCQzAyMUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDNEQzI1MzQxMjRGMTFFMzg3MDBEQkNGOUJDMDIxRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDNEQzI1MzUxMjRGMTFFMzg3MDBEQkNGOUJDMDIxRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5GfbtkAAAAxklEQVR42qRSTQvCMAxduk53mEOHKFPP/v8/5cGTiIibivVFUomlG7gFHvloXpKmJefcPhkmNyvGEWj+IOZA6ckPImoxxVwOLvCvXUzkpayNCpRQK64IbOBnAYGAXMeMslNlU+CzrIEdCkxi5DPAoz6BE8ZuVNdKJuL8rS9sv62IXlCHyP0KqKUKZXK9uwkSLVArfwpVR3b225kXwovibcP+jC4jUtfWPZmfqJJnYlkAM128j1z0nHWKSUbIKDL/msHktwADAPptQo+vkZNLAAAAAElFTkSuQmCC)!important}
.at4-recommended-horizontal .at4-no-image-gray-recommended .at4-recommended-item-placeholder-img,.at4-recommended-horizontal .at4-no-image-light-recommended .at4-recommended-item-placeholder-img,.at4-recommended-horizontal .at4-no-image-minimal-recommended .at4-recommended-item-placeholder-img{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAfCAYAAACCox+xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzREMyNTMyMTI0RjExRTM4NzAwREJDRjlCQzAyMUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzREMyNTMzMTI0RjExRTM4NzAwREJDRjlCQzAyMUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUU1RTJBODkxMjREMTFFMzg3MDBEQkNGOUJDMDIxRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUU1RTJBOEExMjREMTFFMzg3MDBEQkNGOUJDMDIxRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6dfDQvAAABg0lEQVR42uyWS0vDQBDH82jaKNW0qUltbl68e/Di98eLBz+CCB5EBaWIpUat/4UJLMuame1j7SEDYbqbKfPLvHbDi8ur8+D/5T4K9kR6xrr27D+xgdS3N9d3PilQFmcNzN6mxkbdhxrQcoGofXkFAUAINcVzrG2vsP8KmJdtg7SlxoRQouBywOReQOAosUDoklPEpEU5XDciqeB/iRAig6pIO4P8CHysBBDqg0palrR2Alkwjj5RsDUDoRqhorpq6quifRkInKiIPLf4eWIgQoLoWbq0stXXn10DmDeoR2PsL/E84N0Hk5Wypc70dMkGGhzOoeb4gpjW34K6GEFljFkGu6XTZJUCEMQBVCHs6kI60MycB47FyUmo20oPvYJCzhVnvIsR3zg5ghoRTNpyHKTBBhIJTt6pFsoZ9iLDZswcB5uBULhnho0a66eazaFDca59Hym1e4guQ4rCO4Fu/T4Sw8Gk+c3MghN6H+8CRKVg4tB6fV8XI6/SgXQgHYir/AowAMU5TskhKVUNAAAAAElFTkSuQmCC)!important}
.at4-recommended-vertical .at4-no-image-gray-recommended .at4-recommended-item-placeholder-img,.at4-recommended-vertical .at4-no-image-light-recommended .at4-recommended-item-placeholder-img,.at4-recommended-vertical .at4-no-image-minimal-recommended .at4-recommended-item-placeholder-img{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzREMyNTNBMTI0RjExRTM4NzAwREJDRjlCQzAyMUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzREMyNTNCMTI0RjExRTM4NzAwREJDRjlCQzAyMUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDNEQzI1MzgxMjRGMTFFMzg3MDBEQkNGOUJDMDIxRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDNEQzI1MzkxMjRGMTFFMzg3MDBEQkNGOUJDMDIxRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz65Fr9cAAAA0ElEQVR42qRRuQrCQBDd3SSaIgYNosSrtLew8f+xsfAnYmEVRMR4YHwjExjCbsBk4DHHzptjR2+2u7VqJ3efjTNQ/EEMgbgiv46H/QNTDPnhCv/mYiLPI21EIIaaUEVgBj+oETQQypgRtidsXfNJpsACBXo28gWgUd9AjrEL0TXhiSh/XhWudlZI/kCdLPtFUGMRCni9p6kl+kAq/D5UavmzX2fNd87obsCSfztnrOR0rjvTiRImkoyAQQNRyZ2jhjenGNVBOpF1WZatyV8BBgBJ+irgS/KHdAAAAABJRU5ErkJggg==)!important}#at-drawer.ats-dark,.at4-recommended.ats-dark .at4-recommended-horizontal .at4-recommended-item-caption,.at4-recommended.ats-dark .at4-recommended-vertical .at4-recommended-item-caption{background:#262b30}#at-drawer.ats-gray,.at4-recommended.ats-gray .at4-recommended-horizontal .at4-recommended-item-caption{background:#f2f2f2}#at-drawer.ats-light,.at4-recommended.ats-light .at4-recommended-horizontal .at4-recommended-item-caption{background:#fff}.at4-recommended.ats-dark .at4-recommended-vertical .at4-recommended-item{background:none}
.at4-recommended.ats-dark .at4-recommended-item .at4-recommended-item-caption a:hover,.at4-recommended.ats-dark .at4-recommended-item .at4-recommended-item-caption a:link,.at4-recommended.ats-dark .at4-recommended-item .at4-recommended-item-caption a:visited,.at4-recommended.ats-dark .at4-recommended-item .at4-recommended-item-caption small,.at4-recommended.ats-dark .at4-recommended-item-caption,.at4-recommended.ats-dark .at-logo a:hover,.at4-recommended.ats-dark .at-recommended-label.at-vertical{color:#fff}.at4-recommended-vertical-logo{padding-top:0;text-align:left}.at4-recommended-vertical-logo .at4-logo-container{line-height:10px}
.at4-recommended-horizontal-logo{text-align:center}.at4-recommended.at-inline .at4-recommended-horizontal-logo{text-align:left}#at4-thankyou .at4-recommended.at-inline .at4-recommended-horizontal{text-align:center}.at4-recommended .at-logo{margin:10px 0 0;padding:0;height:25px;overflow:auto;-ms-box-sizing:content-box;-o-box-sizing:content-box;box-sizing:content-box}
.at4-recommended.at-inline .at4-recommended-horizontal .at-logo{text-align:left}.at4-recommended .at4-logo-container a.at-sponsored-link{color:#666}.at4-recommended-class .at4-logo-container a:hover,.at4-recommendedbox-outer-container .at4-recommended-recommendedbox .at4-logo-container a:hover{color:#000}
</style>
<style type="text/css">
.at-recommendedjumbo-outer-container{margin:0;padding:0;border:0;background:none;color:#000}.at-recommendedjumbo-footer{position:relative;width:100%;height:510px;overflow:hidden;transition:all .3s ease-in-out}.at-mobile .at-recommendedjumbo-footer{height:250px}.at-recommendedjumbo-footer #bg-link:after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.75)}
.at-recommendedjumbo-footer:hover #bg-link:after{background:rgba(0,0,0,.85)}.at-recommendedjumbo-footer *,.at-recommendedjumbo-footer :after,.at-recommendedjumbo-footer :before{box-sizing:border-box}.at-recommendedjumbo-footer:hover #at-recommendedjumbo-footer-bg{animation:atRecommendedJumboAnimatedBackground 1s ease-in-out 1;animation-fill-mode:forwards}.at-recommendedjumbo-footer #at-recommendedjumbo-top-holder{position:absolute;top:0;padding:0 40px;width:100%}
.at-mobile .at-recommendedjumbo-footer #at-recommendedjumbo-top-holder{padding:0 20px}.at-recommendedjumbo-footer .at-recommendedjumbo-footer-inner{position:relative;text-align:center;font-family:helvetica,arial,sans-serif;z-index:2;width:100%}.at-recommendedjumbo-footer #at-recommendedjumbo-label-holder{margin:40px 0 0;max-height:30px}.at-mobile .at-recommendedjumbo-footer #at-recommendedjumbo-label-holder{margin:20px 0 0;max-height:20px}.at-recommendedjumbo-footer #at-recommendedjumbo-label{font-weight:300;font-size:24px;line-height:24px;color:#fff;margin:0}.at-mobile .at-recommendedjumbo-footer #at-recommendedjumbo-label{font-weight:150;font-size:14px;line-height:14px}
.at-recommendedjumbo-footer #at-recommendedjumbo-title-holder{margin:20px 0 0;min-height:3pc;max-height:78pt}.at-mobile .at-recommendedjumbo-footer #at-recommendedjumbo-title-holder{margin:10px 0 0;min-height:24px;max-height:54px}.at-recommendedjumbo-footer #at-recommendedjumbo-content-title{font-size:3pc;line-height:52px;font-weight:700;margin:0}.at-mobile .at-recommendedjumbo-footer #at-recommendedjumbo-content-title{font-size:24px;line-height:27px}.at-recommendedjumbo-footer a{text-decoration:none;color:#fff}
.at-recommendedjumbo-footer a:visited{color:#fff}.at-recommendedjumbo-footer small{margin:20px 0 0;display:inline-block;height:2pc;line-height:2pc;font-size:14px;color:#ccc;cursor:default}.at-mobile .at-recommendedjumbo-footer small{margin:10px 0 0;height:14px;line-height:14px;font-size:9pt}.at-recommendedjumbo-footer .at-logo-container{position:absolute;bottom:20px;margin:auto;left:0;right:0}
.at-mobile .at-recommendedjumbo-footer .at-logo-container{bottom:10px}.at-recommendedjumbo-footer a.at-sponsored-link{color:#ccc}
.at-recommendedjumbo-footer div #at-recommendedjumbo-logo-link{padding:2px 0 0 11px;text-decoration:none;line-height:20px;font-family:helvetica,arial,sans-serif;font-size:9px;color:#ccc}@keyframes atRecommendedJumboAnimatedBackground{0%{transform:scale(1,1)}to{transform:scale(1.1,1.1)}}</style><style type="text/css">.at-resp-share-element{position:relative;padding:0;margin:0;font-size:0;line-height:0}.at-resp-share-element:after,.at-resp-share-element:before{content:" ";display:table}
.at-resp-share-element.at-mobile .at4-share-count-container,.at-resp-share-element.at-mobile .at-label{display:none}.at-resp-share-element .at-share-btn{display:inline-block;*display:inline;*zoom:1;margin:0 2px 5px;padding:0;overflow:hidden;line-height:0;text-decoration:none;text-transform:none;color:#fff;cursor:pointer;transition:all .2s ease-in-out;border:0;font-family:helvetica neue,helvetica,arial,sans-serif;background-color:transparent}.at-resp-share-element .at-share-btn::-moz-focus-inner{border:0;padding:0}
.at-resp-share-element .at-share-btn:focus,.at-resp-share-element .at-share-btn:hover{transform:translateY(-4px);color:#fff;text-decoration:none}.at-resp-share-element .at-share-btn .at-icon-wrapper{float:left}.at-resp-share-element .at-share-btn.at-share-btn.at-svc-compact:hover{transform:none}.at-resp-share-element .at-share-btn .at-label{font-family:helvetica neue,helvetica,arial,sans-serif;font-size:9pt;padding:0 15px 0 0;margin:0 0 0 5px;height:2pc;line-height:2pc;background:none}.at-resp-share-element .at-icon,.at-resp-share-element .at-label{cursor:pointer}.at-resp-share-element .at4-share-count-container{text-decoration:none;float:right;padding-right:15px;font-size:9pt}
.at-mobile .at-resp-share-element .at-label{display:none}.at-resp-share-element.at-mobile .at-share-btn{margin-right:5px}.at-mobile .at-resp-share-element .at-share-btn{padding:5px;margin-right:5px}
</style>
<style type="text/css">
.at-share-tbx-element{position:relative;margin:0;color:#fff;font-size:0}
.at-share-tbx-element,.at-share-tbx-element .at-share-btn{font-family:helvetica neue,helvetica,arial,sans-serif;padding:0;line-height:0}.at-share-tbx-element .at-share-btn{cursor:pointer;margin:0 5px 5px 0;display:inline-block;overflow:hidden;border:0;text-decoration:none;text-transform:none;background-color:transparent;color:inherit;transition:all .2s ease-in-out}
.at-share-tbx-element .at-share-btn:focus,.at-share-tbx-element .at-share-btn:hover{transform:translateY(-4px);outline-offset:-1px;color:inherit}
.at-share-tbx-element .at-share-btn::-moz-focus-inner{border:0;padding:0}.at-share-tbx-element .at-share-btn.at-share-btn.at-svc-compact:hover{transform:none}
.at-share-tbx-element .at-icon-wrapper{vertical-align:middle}
.at-share-tbx-element .at4-share-count,.at-share-tbx-element .at-label{margin:0 7.5px 0 2.5px;text-decoration:none;vertical-align:middle;display:inline-block;background:none;height:0;font-size:inherit;line-height:inherit;color:inherit}.at-share-tbx-element.at-mobile .at4-share-count,.at-share-tbx-element.at-mobile .at-label{display:none}
.at-share-tbx-element .at_native_button{vertical-align:middle}.at-share-tbx-element .addthis_counter.addthis_bubble_style{margin:0 2px;vertical-align:middle;display:inline-block}.at-share-tbx-element .fb_iframe_widget{display:block}
.at-share-tbx-element.at-share-tbx-native .at300b{vertical-align:middle}.at-style-responsive .at-share-btn{padding:5px}.at-style-jumbo{display:table}.at-style-jumbo .at4-spacer{height:1px;display:block;visibility:hidden;opacity:0}.at-style-jumbo .at4-count-container{display:table-cell;text-align:center;min-width:200px;vertical-align:middle;border-right:1px solid #ccc;padding-right:20px}.at-style-jumbo .at4-count{font-size:60px;line-height:60px;font-weight:700}.at-style-jumbo .at4-count-title{position:relative;font-size:18px;line-height:18px;bottom:2px}.at-style-jumbo .at-share-btn-elements{display:table-cell;vertical-align:middle;padding-left:20px}
.at_flat_counter{cursor:pointer;font-family:helvetica,arial,sans-serif;font-weight:700;text-transform:uppercase;display:inline-block;position:relative;vertical-align:top;height:auto;margin:0 5px;padding:0 6px;left:-1px;background:#ebebeb;color:#32363b;transition:all .2s ease}.at_flat_counter:after{top:30%;left:-4px;content:"";position:absolute;border-width:5px 8px 5px 0;border-style:solid;border-color:transparent #ebebeb transparent transparent;display:block;width:0;height:0;transform:translateY(360deg)}
.at_flat_counter:hover{background:#e1e2e2}
</style>
<style type="text/css">
.at4-thankyou-background{top:0;right:0;left:0;bottom:0;-webkit-overflow-scrolling:touch;z-index:9999999;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpizCuu/sRABGBiIBKMKqSOQoAAAwC8KgJipENhxwAAAABJRU5ErkJggg==);background:hsla(217,6%,46%,.95)}.at4-thankyou-background.at-thankyou-shown{position:fixed}.at4-thankyou-inner{position:absolute;width:100%;top:10%;left:50%;margin-left:-50%;text-align:center}.at4-thankyou-mobile .at4-thankyou-inner{top:5%}.thankyou-description{font-weight:400}
.at4-thankyou-background .at4lb-inner{position:relative;width:100%;height:100%}.at4-thankyou-background .at4lb-inner .at4x{position:absolute;top:15px;right:15px;display:block;width:20px;height:20px;padding:20px;margin:0;cursor:pointer;transition:opacity .25s ease-in;opacity:.4;background:url("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMTMvMTKswDp5AAAAd0lEQVQ4jb2VQRLAIAgDE///Z3qqY1FAhalHMCsCIkVEAIAkkVgvp2lDBgYAnAyHkWotLccNrEd4A7X2TqIdqLfnWBAdaF5rJdyJfjtPH5GT37CaGhoVq3nOm/XflUuLUto2pY1d+vRKh0Pp+MrAVtDe2JkvYNQ+jVSEEFmOkggAAAAASUVORK5CYII=") no-repeat center center;overflow:hidden;text-indent:-99999em;border:1px solid transparent}.at4-thankyou-background .at4lb-inner .at4x:focus,.at4-thankyou-background .at4lb-inner .at4x:hover{border:1px solid #fff;border-radius:50%;outline:0}.at4-thankyou-background .at4lb-inner #at4-palogo{position:absolute;bottom:10px;display:inline-block;text-decoration:none;font-family:helvetica,arial,sans-serif;font-size:11px;cursor:pointer;-webkit-transition:opacity .25s ease-in;moz-transition:opacity .25s ease-in;transition:opacity .25s ease-in;opacity:.5;z-index:100020;color:#fff;padding:2px 0 0 13px}
.at4-thankyou-background .at4lb-inner #at4-palogo .at-branding-addthis,.at4-thankyou-background .at4lb-inner #at4-palogo .at-branding-info{color:#fff}.at4-thankyou-background .at4lb-inner #at4-palogo:hover,.at4-thankyou-background.ats-dark .at4lb-inner a#at4-palogo:hover{text-decoration:none;color:#fff;opacity:1}.at4-thankyou-background.ats-dark{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpiZGBgeMZABGBiIBKMKqSOQoAAAwB+cQD6hqlbCwAAAABJRU5ErkJggg==");background:rgba(0,0,0,.85)}.at4-thankyou-background .thankyou-title{color:#fff;font-size:38.5px;margin:10px 20px;line-height:38.5px;font-family:helvetica neue,helvetica,arial,sans-serif;font-weight:300}.at4-thankyou-background.ats-dark .thankyou-description,.at4-thankyou-background.ats-dark .thankyou-title{color:#fff}.at4-thankyou-background .thankyou-description{color:#fff;font-size:18px;margin:10px 0;line-height:24px;padding:0;font-family:helvetica neue,helvetica,arial,sans-serif;font-weight:300}
.at4-thankyou-background .at4-thanks-icons{padding-top:10px}.at4-thankyou-mobile *{-webkit-overflow-scrolling:touch}#at4-thankyou .at4-recommended-recommendedbox .at-logo{display:none}.at4-thankyou .at-h3{height:49px;line-height:49px;margin:0 50px 0 20px;padding:1px 0 0;font-family:helvetica neue,helvetica,arial,sans-serif;font-size:1pc;font-weight:700;color:#fff;text-shadow:0 1px #000}
.at4-thanks{padding-top:50px;text-align:center}.at4-thanks label{display:block;margin:0 0 15px;font-size:1pc;line-height:1pc}.at4-thanks .at4-h2{background:none;border:none;margin:0 0 10px;padding:0;font-family:helvetica neue,helvetica,arial,sans-serif;font-size:28px;font-weight:300;color:#000}.at4-thanks .at4-thanks-icons{position:relative;height:2pc}.at4-thanks .at4-thanks-icons .at-thankyou-label{display:block;padding-bottom:10px;font-size:14px;color:#666}.at4-thankyou-layer .at-follow .at-icon-wrapper{width:2pc;height:2pc}
</style>
<style type="text/css">
.at4-recommended-toaster{position:fixed;top:auto;bottom:0;right:0;z-index:100021}.at4-recommended-toaster.ats-light{border:1px solid #c5c5c5;background:#fff}.at4-recommended-toaster.ats-gray{border:1px solid #c5c5c5;background:#f2f2f2}.at4-recommended-toaster.ats-dark{background:#262b30;color:#fff}.at4-recommended-toaster .at4-recommended-container{padding-top:0;margin:0}.at4-recommended.at4-recommended-toaster div.at-recommended-label{line-height:1pc;font-size:1pc;text-align:left;padding:20px 0 0 20px}.at4-toaster-outer .at4-recommended .at4-recommended-item .at4-recommended-item-caption .at-h4{font-size:11px;line-height:11px;margin:10px 0 6px;height:30px}.at4-recommended.at4-recommended-toaster div.at-recommended-label.ats-gray,.at4-recommended.at4-recommended-toaster div.at-recommended-label.ats-light{color:#464646}
.at4-recommended.at4-recommended-toaster div.at-recommended-label.ats-dark{color:#fff}.at4-toaster-close-control{position:absolute;top:0;right:0;display:block;width:20px;height:20px;line-height:20px;margin:5px 5px 0 0;padding:0;text-indent:-9999em}.at4-toaster-open-control{position:fixed;right:0;bottom:0;z-index:100020}.at4-toaster-outer .at4-recommended-item{width:90pt;border:0;margin:9px 10px 0}.at4-toaster-outer .at4-recommended-item:first-child{margin-left:20px}.at4-toaster-outer .at4-recommended-item:last-child{margin-right:20px}.at4-toaster-outer .at4-recommended-item .at4-recommended-item-img{max-height:90pt;max-width:90pt}.at4-toaster-outer .at4-recommended-item .at4-recommended-item-img img{height:90pt;width:90pt}
.at4-toaster-outer .at4-recommended-item .at4-recommended-item-caption{height:30px;padding:0;margin:0;height:initial}.at4-toaster-outer .ats-dark .at4-recommended-item .at4-recommended-item-caption{background:#262b30}.at4-toaster-outer .at4-recommended .at4-recommended-item .at4-recommended-item-caption small{width:auto;line-height:14px;margin:0}.at4-toaster-outer .at4-recommended.ats-dark .at4-recommended-item .at4-recommended-item-caption small{color:#fff}.at4-recommended-toaster .at-logo{margin:0 0 3px 20px;text-align:left}.at4-recommended-toaster .at-logo .at4-logo-container.at-sponsored-logo{position:relative}.at4-toaster-outer .at4-recommended-item .sponsored-label{text-align:right;font-size:10px;color:#666;float:right;position:fixed;bottom:6px;right:20px;top:initial;z-index:99999}
</style>
<style type="text/css">
.at4-whatsnext{position:fixed;bottom:0!important;right:0;background:#fff;border:1px solid #c5c5c5;margin:-1px;width:390px;height:90pt;overflow:hidden;font-size:9pt;font-weight:400;color:#000;z-index:1800000000}.at4-whatsnext a{color:#666}
.at4-whatsnext .at-whatsnext-content{height:90pt;position:relative}.at4-whatsnext .at-whatsnext-content .at-branding{position:absolute;bottom:15px;right:10px;padding-left:9px;text-decoration:none;line-height:10px;font-family:helvetica,arial,sans-serif;font-size:10px;color:#666}.at4-whatsnext .at-whatsnext-content .at-whatsnext-content-inner{position:absolute;top:15px;right:20px;bottom:15px;left:140px;text-align:left;height:105px}.at4-whatsnext .at-whatsnext-content-inner a{display:inline-block}
.at4-whatsnext .at-whatsnext-content-inner div.at-h6{text-align:left;margin:0;padding:0 0 3px;font-size:11px;color:#666;cursor:default}.at4-whatsnext .at-whatsnext-content .at-h3{text-align:left;margin:5px 0;padding:0;line-height:1.2em;font-weight:400;font-size:14px;height:3pc}.at4-whatsnext .at-whatsnext-content-inner a:link,.at4-whatsnext .at-whatsnext-content-inner a:visited{text-decoration:none;font-weight:400;color:#464646}
.at4-whatsnext .at-whatsnext-content-inner a:hover{color:#000}.at4-whatsnext .at-whatsnext-content-inner small{position:absolute;bottom:15px;line-height:10px;font-size:11px;color:#666;cursor:default;text-align:left}.at4-whatsnext .at-whatsnext-content .at-whatsnext-content-img{position:absolute;top:0;left:0;width:90pt;height:90pt;overflow:hidden}.at4-whatsnext .at-whatsnext-content .at-whatsnext-content-img img{position:absolute;top:0;left:0;max-height:none;max-width:none}
.at4-whatsnext .at-whatsnext-close-control{position:absolute;top:0;right:0;display:block;width:20px;height:20px;line-height:20px;margin:0 5px 0 0;padding:0;text-indent:-9999em}.at-whatsnext-open-control{position:fixed;right:0;bottom:0;z-index:100020}.at4-whatsnext.ats-dark{background:#262b30}.at4-whatsnext.ats-dark .at-whatsnext-content .at-h3,.at4-whatsnext.ats-dark .at-whatsnext-content a.at4-logo:hover,.at4-whatsnext.ats-dark .at-whatsnext-content-inner a:link,.at4-whatsnext.ats-dark .at-whatsnext-content-inner a:visited{color:#fff}
.at4-whatsnext.ats-light{background:#fff}.at4-whatsnext.ats-gray{background:#f2f2f2}.at4-whatsnext.at-whatsnext-nophoto{width:270px}.at4-whatsnext.at-whatsnext-nophoto .at-whatsnext-content-img{display:none}.at4-whatsnext.at-whatsnext-nophoto .at-whatsnext-content .at-whatsnext-content-inner{top:15px;right:0;left:20px}
.at4-whatsnext.at-whatsnext-nophoto .at-whatsnext-content .at-whatsnext-content-inner.addthis_32x32_style{top:0;right:0;left:0;padding:45px 20px 0;font-size:20px}.at4-whatsnext.at-whatsnext-nophoto .at-whatsnext-content .at-whatsnext-content-inner .at4-icon,.at4-whatsnext.at-whatsnext-nophoto .at-whatsnext-content .at-whatsnext-content-inner .at4-icon-fw,.at4-whatsnext.at-whatsnext-nophoto .at-whatsnext-content .at-whatsnext-content-inner .whatsnext-msg{vertical-align:middle}.at-whatsnext-img,.at-whatsnext-img-lnk{position:absolute;left:0}
</style>
<style type="text/css">
.at4-whatsnextmobile{position:fixed;bottom:0;right:0;left:0;background:#fff;z-index:9999998;height:170px;font-size:28px}.at4-whatsnextmobile .col-2{height:100%;font-size:1em}.at4-whatsnextmobile .col-2:first-child{max-width:200px;display:inline-block;float:left}.at4-whatsnextmobile .col-2:last-child{position:absolute;left:200px;right:50px;top:0;bottom:0;display:inline-block}.at4-whatsnextmobile .at-whatsnext-content-inner{font-size:1em}
.at4-whatsnextmobile .at-whatsnext-content-img img{height:100%;width:100%}.at4-whatsnextmobile .at-close-control{font-size:1em;position:absolute;top:0;right:0;width:50px;height:50px}
.at4-whatsnextmobile .at-close-control button{width:100%;height:100%;font-size:1em;font-weight:400;text-decoration:none;opacity:.5;padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}.at4-whatsnextmobile .at-h3,.at4-whatsnextmobile .at-h6{font-size:1em;margin:0;color:#a1a1a1;margin-left:2.5%;margin-top:25px}.at4-whatsnextmobile .at-h3{font-size:1em;line-height:1em;font-weight:500;height:50%}
.at4-whatsnextmobile .at-h3 a{font-size:1em;text-decoration:none}.at4-whatsnextmobile .at-h6{font-size:.8em;line-height:.8em;font-weight:500}.at4-whatsnextmobile .footer{position:absolute;bottom:2px;left:200px;right:0;padding-left:2.5%;font-size:1em;line-height:.6em}
.at4-whatsnextmobile .footer small{font-size:.6em;color:#a1a1a1}.at4-whatsnextmobile .footer small:first-child{margin-right:5%;float:left}.at4-whatsnextmobile .footer small:last-child{margin-right:2.5%;float:right}
.at4-whatsnextmobile .at-whatsnext-content{height:100%}.at4-whatsnextmobile.ats-dark{background:#262b30;color:#fff}.at4-whatsnextmobile .at-close-control button{color:#bfbfbf}.at4-whatsnextmobile.ats-dark a:link,.at4-whatsnextmobile.ats-dark a:visited{color:#fff}.at4-whatsnextmobile.ats-gray{background:#f2f2f2;color:#262b30}
.at4-whatsnextmobile.ats-light{background:#fff;color:#262b30}.at4-whatsnextmobile.ats-dark .footer a:link,.at4-whatsnextmobile.ats-dark .footer a:visited,.at4-whatsnextmobile.ats-gray .footer a:link,.at4-whatsnextmobile.ats-gray .footer a:visited,.at4-whatsnextmobile.ats-light .footer a:link,.at4-whatsnextmobile.ats-light .footer a:visited{color:#a1a1a1}.at4-whatsnextmobile.ats-gray a:link,.at4-whatsnextmobile.ats-gray a:visited,.at4-whatsnextmobile.ats-light a:link,.at4-whatsnextmobile.ats-light a:visited{color:#262b30}
@media only screen and (min-device-width:320px) and (max-device-width:480px){.at4-whatsnextmobile{height:85px;font-size:14px}.at4-whatsnextmobile .col-2:first-child{width:75pt}.at4-whatsnextmobile .col-2:last-child{right:25px;left:75pt}.at4-whatsnextmobile .footer{left:75pt}.at4-whatsnextmobile .at-close-control{width:25px;height:25px}.at4-whatsnextmobile .at-h3,.at4-whatsnextmobile .at-h6{margin-top:12.5px}}
</style>
<style type="text/css">
.at-custom-mobile-bar{left:0;right:0;width:100%;height:56px;position:fixed;text-align:center;z-index:100020;background:#fff;overflow:hidden;box-shadow:0 0 10px 0 rgba(0,0,0,.2);font:initial;line-height:normal;top:auto;bottom:0}.at-custom-mobile-bar.at-custom-mobile-bar-zindex-hide{z-index:-1!important}.at-custom-mobile-bar.atss-top{top:0;bottom:auto}
.at-custom-mobile-bar.atss-bottom{top:auto;bottom:0}.at-custom-mobile-bar .at-custom-mobile-bar-btns{display:inline-block;text-align:center}.at-custom-mobile-bar .at-custom-mobile-bar-counter,.at-custom-mobile-bar .at-share-btn{margin-top:4px}.at-custom-mobile-bar .at-share-btn{display:inline-block;text-decoration:none;transition:none;box-sizing:content-box}.at-custom-mobile-bar .at-custom-mobile-bar-counter{font-family:Helvetica neue,arial;vertical-align:top;margin-left:4px;margin-right:4px;display:inline-block}
.at-custom-mobile-bar .at-custom-mobile-bar-count{font-size:26px;line-height:1.25em;color:#222}.at-custom-mobile-bar .at-custom-mobile-bar-text{font-size:9pt;line-height:1.25em;color:#888;letter-spacing:1px}.at-custom-mobile-bar .at-icon-wrapper{text-align:center;height:3pc;width:3pc;margin:0 4px}.at-custom-mobile-bar .at-icon{vertical-align:top;margin:8px;width:2pc;height:2pc}.at-custom-mobile-bar.at-shfs-medium{height:3pc}.at-custom-mobile-bar.at-shfs-medium .at-custom-mobile-bar-counter{margin-top:6px}.at-custom-mobile-bar.at-shfs-medium .at-custom-mobile-bar-count{font-size:18px}.at-custom-mobile-bar.at-shfs-medium .at-custom-mobile-bar-text{font-size:10px}.at-custom-mobile-bar.at-shfs-medium .at-icon-wrapper{height:40px;width:40px}.at-custom-mobile-bar.at-shfs-medium .at-icon{margin:6px;width:28px;height:28px}.at-custom-mobile-bar.at-shfs-small{height:40px}
.at-custom-mobile-bar.at-shfs-small .at-custom-mobile-bar-counter{margin-top:3px}
.at-custom-mobile-bar.at-shfs-small .at-custom-mobile-bar-count{font-size:1pc}
.at-custom-mobile-bar.at-shfs-small .at-custom-mobile-bar-text{font-size:10px}
.at-custom-mobile-bar.at-shfs-small .at-icon-wrapper{height:2pc;width:2pc}.at-custom-mobile-bar.at-shfs-small .at-icon{margin:4px;width:24px;height:24px}
</style>
<style type="text/css">
.at-custom-sidebar{top:20%;width:58px;position:fixed;text-align:center;z-index:100020;background:#fff;overflow:hidden;box-shadow:0 0 10px 0 rgba(0,0,0,.2);font:initial;line-height:normal;top:auto;bottom:0}.at-custom-sidebar.at-custom-sidebar-zindex-hide{z-index:-1!important}.at-custom-sidebar.atss-left{left:0;right:auto;float:left;border-radius:0 4px 4px 0}.at-custom-sidebar.atss-right{left:auto;right:0;float:right;border-radius:4px 0 0 4px}.at-custom-sidebar .at-custom-sidebar-btns{display:inline-block;text-align:center;padding-top:4px}.at-custom-sidebar .at-custom-sidebar-counter{margin-bottom:8px}.at-custom-sidebar .at-share-btn{display:inline-block;text-decoration:none;transition:none;box-sizing:content-box}
.at-custom-sidebar .at-custom-sidebar-counter{font-family:Helvetica neue,arial;vertical-align:top;margin-left:4px;margin-right:4px;display:inline-block}.at-custom-sidebar .at-custom-sidebar-count{font-size:21px;line-height:1.25em;color:#222}.at-custom-sidebar .at-custom-sidebar-text{font-size:10px;line-height:1.25em;color:#888;letter-spacing:1px}.at-custom-sidebar .at-icon-wrapper{text-align:center;margin:0 4px}.at-custom-sidebar .at-icon{vertical-align:top;margin:9px;width:2pc;height:2pc}.at-custom-sidebar .at-icon-wrapper{position:relative}.at-custom-sidebar .at4-share-count,.at-custom-sidebar .at4-share-count-container{line-height:1pc;font-size:10px}.at-custom-sidebar .at4-share-count{text-indent:0;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:200;width:100%;height:1pc}.at-custom-sidebar .at4-share-count-anchor .at-icon{margin-top:3px}
.at-custom-sidebar .at4-share-count-container{position:absolute;left:0;right:auto;top:auto;bottom:0;width:100%;color:#fff;background:inherit}
</style>
<style type="text/css">
.at-image-sharing-mobile-icon{position:absolute;background:#000 url(https://s7.addthis.com/static/44a36d35bafef33aa9455b7d3039a771.png) no-repeat top center;background-color:rgba(0,0,0,.9);background-image:url(https://s7.addthis.com/static/10db525181ee0bbe1a515001be1c7818.svg),none;border-radius:3px;width:50px;height:40px;top:-9999px;left:-9999px}.at-image-sharing-tool{display:block;position:absolute;text-align:center;z-index:9001;background:none;overflow:hidden;top:-9999px;left:-9999px;font:initial;line-height:0}.at-image-sharing-tool.addthis-animated{animation-duration:.15s}
.at-image-sharing-tool.at-orientation-vertical .at-share-btn{display:block}.at-image-sharing-tool.at-orientation-horizontal .at-share-btn{display:inline-block}.at-image-sharing-tool.at-image-sharing-tool-size-big .at-icon{width:43px;height:43px}.at-image-sharing-tool.at-image-sharing-tool-size-mobile .at-share-btn{margin:0!important}.at-image-sharing-tool.at-image-sharing-tool-size-mobile .at-icon-wrapper{height:60px;width:100%;border-radius:0!important}
.at-image-sharing-tool.at-image-sharing-tool-size-mobile .at-icon{max-width:100%;height:54px!important;width:54px!important}.at-image-sharing-tool .at-custom-shape.at-image-sharing-tool-btns{margin-right:8px;margin-bottom:8px}.at-image-sharing-tool .at-custom-shape .at-share-btn{margin-top:8px;margin-left:8px}.at-image-sharing-tool .at-share-btn{line-height:0;text-decoration:none;transition:none;box-sizing:content-box}
.at-image-sharing-tool .at-icon-wrapper{text-align:center;height:100%;width:100%}.at-image-sharing-tool .at-icon{vertical-align:top;width:2pc;height:2pc;margin:3px}</style><style type="text/css">.at-expanding-share-button{box-sizing:border-box;position:fixed;z-index:9999}.at-expanding-share-button[data-position=bottom-right]{bottom:10px;right:10px}
.at-expanding-share-button[data-position=bottom-right] .at-expanding-share-button-toggle-bg,.at-expanding-share-button[data-position=bottom-right] .at-expanding-share-button-toggle-btn[data-name]:after,.at-expanding-share-button[data-position=bottom-right] .at-icon-wrapper,.at-expanding-share-button[data-position=bottom-right] [data-name]:after{float:right}
.at-expanding-share-button[data-position=bottom-right] [data-name]:after{margin-right:10px}
.at-expanding-share-button[data-position=bottom-right] .at-expanding-share-button-toggle-btn[data-name]:after{margin-right:5px}.at-expanding-share-button[data-position=bottom-right] .at-icon-wrapper{margin-right:-3px}.at-expanding-share-button[data-position=bottom-left]{bottom:10px;left:10px}.at-expanding-share-button[data-position=bottom-left] .at-expanding-share-button-toggle-bg,.at-expanding-share-button[data-position=bottom-left] .at-expanding-share-button-toggle-btn[data-name]:after,.at-expanding-share-button[data-position=bottom-left] .at-icon-wrapper,.at-expanding-share-button[data-position=bottom-left] [data-name]:after{float:left}
.at-expanding-share-button[data-position=bottom-left] [data-name]:after{margin-left:10px}.at-expanding-share-button[data-position=bottom-left] .at-expanding-share-button-toggle-btn[data-name]:after{margin-left:5px}.at-expanding-share-button *,.at-expanding-share-button :after,.at-expanding-share-button :before{box-sizing:border-box}.at-expanding-share-button .at-expanding-share-button-services-list{display:none;list-style:none;margin:0 5px;overflow:visible;padding:0}
.at-expanding-share-button .at-expanding-share-button-services-list>li{display:block;height:45px;position:relative;overflow:visible}.at-expanding-share-button .at-expanding-share-button-toggle-btn,.at-expanding-share-button .at-share-btn{transition:.1s;text-decoration:none}.at-expanding-share-button .at-share-btn{display:block;height:40px;padding:0 3px 0 0}.at-expanding-share-button .at-expanding-share-button-toggle-btn{position:relative;overflow:auto}.at-expanding-share-button .at-expanding-share-button-toggle-btn.at-expanding-share-button-hidden[data-name]:after{display:none}.at-expanding-share-button .at-expanding-share-button-toggle-bg{box-shadow:0 2px 4px 0 rgba(0,0,0,.3);border-radius:50%;position:relative}
.at-expanding-share-button .at-expanding-share-button-toggle-bg>span{
  background-image:url(
    ""
    );
  background-position:center center;background-repeat:no-repeat;transition:transform .4s ease;border-radius:50%;display:block}
.at-expanding-share-button .at-icon-wrapper{box-shadow:0 2px 4px 0 rgba(0,0,0,.3);border-radius:50%;display:inline-block;height:40px;line-height:40px;text-align:center;width:40px}.at-expanding-share-button .at-icon{display:inline-block;height:34px;margin:3px 0;vertical-align:top;width:34px}.at-expanding-share-button [data-name]:after{box-shadow:0 2px 4px 0 rgba(0,0,0,.3);transform:translate(0, -50%);transition:.4s;background-color:#fff;border-radius:3px;color:#666;content:attr(data-name);font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:9pt;line-height:9pt;font-weight:500;opacity:0;padding:3px 5px;position:relative;top:20px;white-space:nowrap}.at-expanding-share-button.at-expanding-share-button-show-icons .at-expanding-share-button-services-list{display:block}
.at-expanding-share-button.at-expanding-share-button-animate-in .at-expanding-share-button-toggle-bg>span{transform:rotate(270deg);background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cg%3E%3Cpath%20d%3D%22M18%2014V8h-4v6H8v4h6v6h4v-6h6v-4h-6z%22%20fill-rule%3D%22evenodd%22%20fill%3D%22white%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
background-position:center center;background-repeat:no-repeat}
.at-expanding-share-button.at-expanding-share-button-animate-in [data-name]:after{opacity:1}
.at-expanding-share-button.at-hide-label [data-name]:after{display:none}.at-expanding-share-button.at-expanding-share-button-desktop .at-expanding-share-button-toggle{height:50px}.at-expanding-share-button.at-expanding-share-button-desktop .at-icon-wrapper:hover{box-shadow:0 2px 5px 0 rgba(0,0,0,.5)}
.at-expanding-share-button.at-expanding-share-button-desktop .at-expanding-share-button-toggle-bg{height:50px;line-height:50px;width:50px}.at-expanding-share-button.at-expanding-share-button-desktop .at-expanding-share-button-toggle-bg>span{height:50px;width:50px}.at-expanding-share-button.at-expanding-share-button-desktop .at-expanding-share-button-toggle-bg:after{box-shadow:0 2px 5px 0 rgba(0,0,0,.2);transition:opacity .2s ease;border-radius:50%;content:'';height:100%;opacity:0;position:absolute;top:0;left:0;width:100%}.at-expanding-share-button.at-expanding-share-button-desktop .at-expanding-share-button-toggle-bg:hover:after{opacity:1}
.at-expanding-share-button.at-expanding-share-button-desktop .at-expanding-share-button-toggle-btn[data-name]:after{top:25px}.at-expanding-share-button.at-expanding-share-button-mobile .at-expanding-share-button-services-list{margin:0}.at-expanding-share-button.at-expanding-share-button-mobile .at-expanding-share-button-toggle-btn,.at-expanding-share-button.at-expanding-share-button-mobile .at-share-btn{outline:0}
.at-expanding-share-button.at-expanding-share-button-mobile .at-expanding-share-button-toggle{height:40px;-webkit-tap-highlight-color:transparent}.at-expanding-share-button.at-expanding-share-button-mobile .at-expanding-share-button-toggle-bg,.at-expanding-share-button.at-expanding-share-button-mobile .at-expanding-share-button-toggle-bg span{height:40px;line-height:40px;width:40px}.at-expanding-share-button.at-expanding-share-button-mobile .at-expanding-share-button-click-flash{transform:scale(0);transition:transform ease,opacity ease-in;background-color:hsla(0,0%,100%,.3);border-radius:50%;height:40px;opacity:1;position:absolute;width:40px;z-index:10000}
.at-expanding-share-button.at-expanding-share-button-mobile .at-expanding-share-button-click-flash.at-expanding-share-button-click-flash-animate{transform:scale(1);opacity:0}.at-expanding-share-button.at-expanding-share-button-mobile+.at-expanding-share-button-mobile-overlay{transition:opacity ease;bottom:0;background-color:hsla(0,0%,87%,.7);display:block;height:auto;left:0;opacity:0;position:fixed;right:0;top:0;width:auto;z-index:9998}.at-expanding-share-button.at-expanding-share-button-mobile+.at-expanding-share-button-mobile-overlay.at-expanding-share-button-hidden{height:0;width:0;z-index:-10000}.at-expanding-share-button.at-expanding-share-button-mobile.at-expanding-share-button-animate-in+.at-expanding-share-button-mobile-overlay{transition:opacity ease;opacity:1}</style><style type="text/css">.at-tjin-element .at300b,.at-tjin-element .at300m{display:inline-block;width:auto;padding:0;margin:0 2px 5px;outline-offset:-1px;transition:all .2s ease-in-out}.at-tjin-element .at300b:focus,.at-tjin-element .at300b:hover,.at-tjin-element .at300m:focus,.at-tjin-element .at300m:hover{transform:translateY(-4px)}.at-tjin-element .addthis_tjin_label{display:none}.at-tjin-element .addthis_vertical_style .at300b,.at-tjin-element .addthis_vertical_style .at300m{display:block}.at-tjin-element .addthis_vertical_style .at300b .addthis_tjin_label,.at-tjin-element .addthis_vertical_style .at300b .at-icon-wrapper,.at-tjin-element .addthis_vertical_style .at300m .addthis_tjin_label,.at-tjin-element .addthis_vertical_style .at300m .at-icon-wrapper{display:inline-block;vertical-align:middle;margin-right:5px}.at-tjin-element .addthis_vertical_style .at300b:focus,.at-tjin-element .addthis_vertical_style .at300b:hover,.at-tjin-element .addthis_vertical_style .at300m:focus,.at-tjin-element .addthis_vertical_style .at300m:hover{transform:none}.at-tjin-element .at-tjin-btn{margin:0 5px 5px 0;padding:0;outline-offset:-1px;display:inline-block;box-sizing:content-box;transition:all .2s ease-in-out}.at-tjin-element .at-tjin-btn:focus,.at-tjin-element .at-tjin-btn:hover{transform:translateY(-4px)}
.at-tjin-element .at-tjin-title{margin:0 0 15px}</style><style type="text/css">#addthissmartlayerscssready{color:#bada55!important}.addthis-smartlayers,div#at4-follow,div#at4-share,div#at4-thankyou,div#at4-whatsnext{padding:0;margin:0}#at4-follow-label,#at4-share-label,#at4-whatsnext-label,.at4-recommended-label.hidden{padding:0;border:none;background:none;position:absolute;top:0;left:0;height:0;width:0;overflow:hidden;text-indent:-9999em}.addthis-smartlayers .at4-arrow:hover{cursor:pointer}.addthis-smartlayers .at4-arrow:after,.addthis-smartlayers .at4-arrow:before{content:none}a.at4-logo{background:url(data:image/gif;base64,R0lGODlhBwAHAJEAAP9uQf///wAAAAAAACH5BAkKAAIALAAAAAAHAAcAAAILFH6Ge8EBH2MKiQIAOw==) no-repeat left center}.at4-minimal a.at4-logo{background:url(data:image/gif;base64,R0lGODlhBwAHAJEAAP9uQf///wAAAAAAACH5BAkKAAIALAAAAAAHAAcAAAILFH6Ge8EBH2MKiQIAOw==) no-repeat left center!important}button.at4-closebutton{position:absolute;top:0;right:0;padding:0;margin-right:10px;cursor:pointer;background:transparent;border:0;-webkit-appearance:none;font-size:19px;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.2}button.at4-closebutton:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.5}
div.at4-arrow{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAoCAYAAABpYH0BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAV1JREFUeNrsmesOgyAMhQfxwfrofTM3E10ME2i5Oeppwr9a5OMUCrh1XV+wcvNAAIAA+BiAzrmtUWln27dbjEcC3AdODfo0BdEPhmcO4nIDvDNELi2jggk4/k8dT7skfeKzWIEd4VUpMQKvNB7X+OZSmAZkATWC1xvipbpnLmOosbJZC08CkAeA4E6qFUEMwLAGnlSBPCE8lW8CYnZTcimH2HoT7kSFOx5HBmCnDhTIu1p5s98G+QZrxGPhZVMY1vgyAQaAAAiAAAgDQACcBOD+BvJtBWfRy7NpJK5tBe4FNzXokywV734wPHMQlxvgnSGyNoUP/2ACjv/7iSeYKO3YWKzAjvCqlBiBVxqPa3ynexNJwOsN8TJbzL6JNIYYXWpMv4lIIAZgWANPqkCeEJ7KNwExu8lpLlSpAVQarO77TyKdBsyRPuwV0h0gmoGnTWFYzVkYBoAA+I/2FmAAt6+b5XM9mFkAAAAASUVORK5CYII=);background-repeat:no-repeat;width:20px;height:20px;margin:0;padding:0;overflow:hidden;text-indent:-9999em;text-align:left;cursor:pointer}#at4-recommendedpanel-outer-container .at4-arrow.at-right,div.at4-arrow.at-right{background-position:-20px 0}#at4-recommendedpanel-outer-container .at4-arrow.at-left,div.at4-arrow.at-left{background-position:0 0}div.at4-arrow.at-down{background-position:-60px 0}div.at4-arrow.at-up{background-position:-40px 0}.ats-dark div.at4-arrow.at-right{background-position:-20px -20px}.ats-dark div.at4-arrow.at-left{background-position:0 -20px}.ats-dark div.at4-arrow.at-down{background-position:-60px -20px}.ats-dark div.at4-arrow.at-up{background-position:-40px -20}.at4-opacity-hidden{opacity:0!important}.at4-opacity-visible{opacity:1!important}.at4-visually-hidden{position:absolute;clip:rect(1px,1px,1px,1px);padding:0;border:0;overflow:hidden}.at4-hidden-off-screen,.at4-hidden-off-screen *{position:absolute!important;top:-9999px!important;left:-9999px!important}.at4-show{display:block!important;opacity:1!important}.at4-show-content{opacity:1!important;visibility:visible}.at4-hide{display:none!important;opacity:0!important}.at4-hide-content{opacity:0!important;visibility:hidden}
.at4-visible{display:block!important;opacity:0!important}.at-wordpress-hide{display:none!important;opacity:0!important}.addthis-animated{animation-fill-mode:both;animation-timing-function:ease-out;animation-duration:.3s}.slideInDown.addthis-animated,.slideInLeft.addthis-animated,.slideInRight.addthis-animated,.slideInUp.addthis-animated,.slideOutDown.addthis-animated,.slideOutLeft.addthis-animated,.slideOutRight.addthis-animated,.slideOutUp.addthis-animated{animation-duration:.4s}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.fadeIn{animation-name:fadeIn}@keyframes fadeInUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.fadeInUp{animation-name:fadeInUp}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
.fadeInDown{animation-name:fadeInDown}@keyframes fadeInLeft{0%{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}.fadeInLeft{animation-name:fadeInLeft}@keyframes fadeInRight{0%{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}.fadeInRight{animation-name:fadeInRight}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.fadeOut{animation-name:fadeOut}@keyframes fadeOutUp{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-20px)}}.fadeOutUp{animation-name:fadeOutUp}@keyframes fadeOutDown{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(20px)}}.fadeOutDown{animation-name:fadeOutDown}@keyframes fadeOutLeft{0%{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-20px)}}.fadeOutLeft{animation-name:fadeOutLeft}@keyframes fadeOutRight{0%{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(20px)}}
.fadeOutRight{animation-name:fadeOutRight}@keyframes slideInUp{0%{transform:translateY(1500px)}0%,to{opacity:1}to{transform:translateY(0)}}.slideInUp{animation-name:slideInUp}.slideInUp.addthis-animated{animation-duration:.4s}@keyframes slideInDown{0%{transform:translateY(-850px)}0%,to{opacity:1}to{transform:translateY(0)}}.slideInDown{animation-name:slideInDown}@keyframes slideOutUp{0%{transform:translateY(0)}0%,to{opacity:1}to{transform:translateY(-250px)}}.slideOutUp{animation-name:slideOutUp}@keyframes slideOutUpFast{0%{transform:translateY(0)}0%,to{opacity:1}to{transform:translateY(-1250px)}}#at4m-menu.slideOutUp{animation-name:slideOutUpFast}@keyframes slideOutDown{0%{transform:translateY(0)}0%,to{opacity:1}to{transform:translateY(350px)}}.slideOutDown{animation-name:slideOutDown}@keyframes slideOutDownFast{0%{transform:translateY(0)}0%,to{opacity:1}to{transform:translateY(1250px)}}#at4m-menu.slideOutDown{animation-name:slideOutDownFast}@keyframes slideInLeft{0%{opacity:0;transform:translateX(-850px)}to{transform:translateX(0)}}.slideInLeft{animation-name:slideInLeft}@keyframes slideInRight{0%{opacity:0;transform:translateX(1250px)}to{transform:translateX(0)}}.slideInRight{animation-name:slideInRight}@keyframes slideOutLeft{0%{transform:translateX(0)}to{opacity:0;transform:translateX(-350px)}}.slideOutLeft{animation-name:slideOutLeft}@keyframes slideOutRight{0%{transform:translateX(0)}to{opacity:0;transform:translateX(350px)}}
.slideOutRight{animation-name:slideOutRight}.at4win{margin:0 auto;background:#fff;border:1px solid #ebeced;width:25pc;box-shadow:0 0 10px rgba(0,0,0,.3);border-radius:8px;font-family:helvetica neue,helvetica,arial,sans-serif;text-align:left;z-index:9999}.at4win .at4win-header{position:relative;border-bottom:1px solid #f2f2f2;background:#fff;height:49px;-webkit-border-top-left-radius:8px;-webkit-border-top-right-radius:8px;-moz-border-radius-topleft:8px;-moz-border-radius-topright:8px;border-top-left-radius:8px;border-top-right-radius:8px;cursor:default}.at4win .at4win-header .at-h3,.at4win .at4win-header h3{height:49px;line-height:49px;margin:0 50px 0 0;padding:1px 0 0;margin-left:20px;font-family:helvetica neue,helvetica,arial,sans-serif;font-size:1pc;font-weight:700;text-shadow:0 1px #fff;color:#333}
.at4win .at4win-header .at-h3 img,.at4win .at4win-header h3 img{display:inline-block;margin-right:4px}.at4win .at4win-header .at4-close{display:block;position:absolute;top:0;right:0;background:url("data:image/gif;base64,R0lGODlhFAAUAIABAAAAAP///yH5BAEAAAEALAAAAAAUABQAAAIzBIKpG+YMm5Enpodw1HlCfnkKOIqU1VXk55goVb2hi7Y0q95lfG70uurNaqLgTviyyUoFADs=") no-repeat center center;background-repeat:no-repeat;background-position:center center;border-left:1px solid #d2d2d1;width:49px;height:49px;line-height:49px;overflow:hidden;text-indent:-9999px;text-shadow:none;cursor:pointer;opacity:.5;border:0;transition:opacity .15s ease-in}.at4win .at4win-header .at4-close::-moz-focus-inner{border:0;padding:0}
.at4win .at4win-header .at4-close:hover{opacity:1;background-color:#ebeced;border-top-right-radius:7px}.at4win .at4win-content{position:relative;background:#fff;min-height:220px}#at4win-footer{position:relative;background:#fff;border-top:1px solid #d2d2d1;-webkit-border-bottom-right-radius:8px;-webkit-border-bottom-left-radius:8px;-moz-border-radius-bottomright:8px;-moz-border-radius-bottomleft:8px;border-bottom-right-radius:8px;border-bottom-left-radius:8px;height:11px;line-height:11px;padding:5px 20px;font-size:11px;color:#666;-ms-box-sizing:content-box;-o-box-sizing:content-box;box-sizing:content-box}#at4win-footer a{margin-right:10px;text-decoration:none;color:#666}#at4win-footer a:hover{text-decoration:none;color:#000}
#at4win-footer a.at4-logo{top:5px;padding-left:10px}#at4win-footer a.at4-privacy{position:absolute;top:5px;right:10px;padding-right:14px}.at4win.ats-dark{border-color:#555;box-shadow:none}.at4win.ats-dark .at4win-header{background:#1b1b1b;-webkit-border-top-left-radius:6px;-webkit-border-top-right-radius:6px;-moz-border-radius-topleft:6px;-moz-border-radius-topright:6px;border-top-left-radius:6px;border-top-right-radius:6px}
.at4win.ats-dark .at4win-header .at4-close{background:url("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMTMvMTKswDp5AAAAd0lEQVQ4jb2VQRLAIAgDE///Z3qqY1FAhalHMCsCIkVEAIAkkVgvp2lDBgYAnAyHkWotLccNrEd4A7X2TqIdqLfnWBAdaF5rJdyJfjtPH5GT37CaGhoVq3nOm/XflUuLUto2pY1d+vRKh0Pp+MrAVtDe2JkvYNQ+jVSEEFmOkggAAAAASUVORK5CYII=") no-repeat center center;background-image:url(https://s7.addthis.com/static/fb08f6d50887bd0caacc86a62bcdcf68.svg),none;border-color:#333}.at4win.ats-dark .at4win-header .at4-close:hover{background-color:#000}.at4win.ats-dark .at4win-header .at-h3,.at4win.ats-dark .at4win-header h3{color:#fff;text-shadow:0 1px #000}
.at4win.ats-gray .at4win-header{background:#fff;border-color:#d2d2d1;-webkit-border-top-left-radius:6px;-webkit-border-top-right-radius:6px;-moz-border-radius-topleft:6px;-moz-border-radius-topright:6px;border-top-left-radius:6px;border-top-right-radius:6px}.at4win.ats-gray .at4win-header a.at4-close{border-color:#d2d2d1}.at4win.ats-gray .at4win-header a.at4-close:hover{background-color:#ebeced}.at4win.ats-gray 
#at4win-footer{border-color:#ebeced}.at4win .clear{clear:both}.at4win ::selection{background:#fe6d4c;color:#fff}.at4win ::-moz-selection{background:#fe6d4c;color:#fff}.at4-icon-fw{display:inline-block;background-repeat:no-repeat;background-position:0 0;margin:0 5px 0 0;overflow:hidden;text-indent:-9999em;cursor:pointer;padding:0;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%}.at44-follow-container a.aticon{height:2pc;margin:0 5px 5px 0}.at44-follow-container .at4-icon-fw{margin:0}
</style>
</head>

<body data-theme-version="18" data-ad-refresh="0">

    <div class="page-wrapper">
        <div class="page-header">
        <header class="header  on-core  " id="js-top-header">
    <div class="header__row header__main">
        <div class="header__branding" role="banner">
            <h1>
                <a href="https://www.politico.com/" tabindex="3">
                    <svg height="100%" width="261" viewBox="0 0 261 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="title" class="is-emphasized">
                        <title>POLITICO</title>
                        <desc>Politico Logo</desc>
                        <path id="politico-logo" d="M221.9,12.7c3.6-3.6,7.9-5.4,13.1-5.4c5.2,0,9.6,1.8,13.1,5.4c3.5,3.6,5.3,8,5.3,13.3c0,5.2-1.8,9.7-5.4,13.3c-3.6,3.6-8,5.4-13.2,5.4c-4.8,0-9.1-1.8-12.7-5.3c-3.7-3.5-5.5-8.1-5.5-13.6C216.6,20.7,218.3,16.3,221.9,12.7 M217.4,45.1c5.1,4.4,10.9,6.7,17.3,6.7c7.3,0,13.5-2.5,18.6-7.5c5.1-5,7.7-11.1,7.7-18.2c0-7.1-2.5-13.2-7.6-18.3c-5.1-5.1-11.1-7.6-18.2-7.6c-7.2,0-13.3,2.5-18.4,7.5c-5.1,5-7.7,11-7.7,18C209,33.8,211.8,40.2,217.4,45.1 M195,0.2c-8.2,0-14.9,3-20,9.1c-4.2,5-6.3,10.6-6.3,16.9c0,7.1,2.5,13.1,7.5,18.1c5,5,11.1,7.4,18.2,7.4c4.7,0,9.2-1.2,13.5-3.7v-9.1c-1.2,1-2.4,1.9-3.5,2.6c-1.1,0.7-2.2,1.3-3.2,1.7c-1.8,0.9-4.1,1.3-6.7,1.3c-5.1,0-9.4-1.8-13-5.4c-3.5-3.6-5.3-8-5.3-13.2c0-5.3,1.8-9.8,5.3-13.4c3.5-3.7,7.8-5.5,12.9-5.5c4.6,0,9.1,1.8,13.5,5.4V3.8C203.8,1.4,199.5,0.2,195,0.2 M157,50.9h7.5V1.2H157V50.9z M153.5,8.2V1.2h-30.4v7.1h11.4v42.7h7.5V8.2H153.5z M112.2,50.9h7.5V1.2h-7.5V50.9z M86.5,1.2v49.8h22.1v-7.1H94V1.2H86.5z M43.2,12.7c3.6-3.6,7.9-5.4,13.1-5.4c5.2,0,9.6,1.8,13.1,5.4c3.5,3.6,5.3,8,5.3,13.3c0,5.2-1.8,9.7-5.4,13.3c-3.6,3.6-8,5.4-13.2,5.4c-4.8,0-9.1-1.8-12.7-5.3c-3.7-3.5-5.5-8.1-5.5-13.6C37.9,20.7,39.7,16.3,43.2,12.7 M38.7,45.1c5.1,4.4,10.9,6.7,17.3,6.7c7.3,0,13.5-2.5,18.6-7.5c5.1-5,7.7-11.1,7.7-18.2c0-7.1-2.5-13.2-7.6-18.3c-5.1-5.1-11.1-7.6-18.2-7.6c-7.2,0-13.3,2.5-18.4,7.5c-5.1,5-7.7,11-7.7,18C30.3,33.8,33.1,40.2,38.7,45.1 M7.5,8.1H10c7.1,0,10.7,2.6,10.7,7.7c0,5.3-3.4,8-10.3,8H7.5V8.1z M11,30.7c5.2,0,9.3-1.3,12.3-4c3.1-2.7,4.6-6.3,4.6-10.8c0-4.3-1.4-7.8-4.3-10.6C22,3.7,20.1,2.6,17.9,2c-2.1-0.6-5.3-0.9-9.4-0.9H0v49.8h7.5V30.7H11z"></path>
                    </svg>
                </a>
            </h1>
        </div>
        <div class="header__content">
            <div class="header__left">
                
                    <button aria-label="Master menu" aria-expanded="false" class="hamburger js-hamburger" tabindex="2">
                        <span></span>
                    </button>
                
            </div>
            <div class="header__right">
                <div class="actions-lineup">
                    <ul class="actions-lineup__list">
                          

<li class="actions-lineup__item  hide-at-mobile">  
</li>  
<li class="actions-lineup__item  hide-at-mobile">  
</li>  
<li class="actions-lineup__item  hide-at-mobile">  
</li>  
<li class="actions-lineup__item ">
    <div class="slide-search" role="presentation">
        <a href="#" class="slide-search__open js-tealium-tracking " aria-label="Open search form" aria-pressed="false" target="_top" role="button" data-tracking="mpos=&amp;mid=&amp;lindex=&amp;lcol=" id="search-open"><b class="bt-icon bt-icon--search"></b><span class="icon-text">Search</span></a>
        <div class="slide-search__content " id="search-input" aria-hidden="true">
            <form class="slide-search__form" action="q" method="get">
                <input class="slide-search__input" type="search" name="q" id="searchTerm" aria-label="Search for any story" placeholder="Enter search term...">
                <button class="slide-search__run" type="submit" aria-label="Start search"><b class="bt-icon bt-icon--search"></b><span class="icon-text">Search</span></button>
                <button class="slide-search__close" id="search-close" type="button"><b class="bt-icon bt-icon--close" aria-label="Close Search"></b></button>
            </form>
        </div>
    </div>
</li>  
                    </ul>
                </div>
            </div>
        </div>
    </div>
<nav class="master-menu js-master-menu" role="navigation" aria-hidden="true">
    <div class="master-menu__content ">  
            <div class="row row--6-col">  
                    <div class="col is-menu">
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">SECTIONS</h2>
                                <ul class="master-menu__list">
                                    <li class="master-menu__item">Congress</a></li>
                                    <li class="master-menu__item">White House</a></li>
                                    <li class="master-menu__item">Magazine</a></li>
                                        <li class="master-menu__item">  </li>
                                        <li class="master-menu__item">  </li>
                                        <li class="master-menu__item">  </li>
                                        <li class="master-menu__item">  </li>
                                </ul>
                            </div>
                    </div>  
                    <div class="col is-menu">
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">Elections</h2>
                                <ul class="master-menu__list">
                                        <li class="master-menu__item">  </li>
                                        <li class="master-menu__item">  </li>
                                        <li class="master-menu__item">  </li>
                                        <li class="master-menu__item">  </li>
                                        <li class="master-menu__item">  </li>
                                        <li class="master-menu__item">  </li>
                                </ul>

                            </div>
                        
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">SERIES</h2>
                                
                                <ul class="master-menu__list">
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                </ul>
                                
                            </div>
                        
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">The Exchange</h2>
                                
                                <ul class="master-menu__list">
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                </ul>
                                
                            </div>
                        
                    </div>  
                
                    

                    <div class="col is-menu">
                        
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">NEWSLETTERS</h2>
                                
                                <ul class="master-menu__list">
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                </ul>
                                
                            </div>
                        
                    </div>  
                
                    

                    <div class="col is-menu">
                        
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">POLITICO LIVE</h2>
                                
                                <ul class="master-menu__list">
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                </ul>
                                
                            </div>
                        
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">COLUMNS &amp; CARTOONS</h2>
                                
                                <ul class="master-menu__list">
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                </ul>
                                
                            </div>
                        
                    </div>  
                
                    

                    <div class="col is-menu">
                        
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">POLICY</h2>
                                
                                <ul class="master-menu__list">
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                </ul>
                            </div>
                    </div>                
                    

                    <div class="col is-menu">
                        
                            <div class="col is-menu">
                                <h2 class="menu-toggle js-menu-toggle section-heading" tabindex="-1">EDITIONS</h2>
                                
                                <ul class="master-menu__list">
                                        <li class="master-menu__item">
                                          </li>
                                        <li class="master-menu__item">
                                          </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>
                                        
                                    
                                        
                                        

                                        <li class="master-menu__item">  </li>

                                </ul>
                            </div>
                    </div>
            </div>
        <footer class="row menu-footer">
                <div class="menu-footer__follow">
                    <h2 class="section-heading">Follow us</h2>
                    <ul class="menu-footer__list menu-footer__list--follow">

                            <li class="menu-footer__item">  </li>
                        
                        
                        
                            
                            <li class="menu-footer__item">  </li>
                        
                        
                        
                            
                            <li class="menu-footer__item">  </li>
                        
                        
                    </ul>
                </div>
                  
                  
                  
                  
                  
                  
                  
            
            
            
                

                <div class="menu-footer__actions">
                    <ul class="menu-footer__list menu-footer__list--actions">
                      <li class="menu-footer__item">
                        <a href="https://www.politico.com/settings" class=" js-tealium-tracking " target="_top" data-tracking="mpos=&amp;mid=&amp;lindex=&amp;lcol=" tabindex="-1">
                        My Account</a>
                      </li>

                      <li class="menu-footer__item">
                        <a href="https://www.politico.com//_login?base=https%253A%252F%252Fwww.politico.com&amp;redirect=%2F_login&amp;logout=%2F_logout&amp;lRedirect=true&amp;sRedirect=%2Fsettings&amp;js=false" class="politico-auth auth-logged-out js-tealium-tracking " style="" target="_top" data-tracking="mpos=&amp;mid=&amp;lindex=&amp;lcol=" tabindex="-1">
                          Log In
                        </a>
                      </li>

                      <li class="menu-footer__item">
                        <a href="https://www.politico.com//_logout?base=https%253A%252F%252Fwww.politico.com&amp;redirect=%2F_logout&amp;js=false" class="politico-auth auth-logged-out js-tealium-tracking " style="" target="_top" data-tracking="mpos=&amp;mid=&amp;lindex=&amp;lcol=" tabindex="-1">Log Out
                        </a>
                      </li>
                    </ul>
                </div>

        </footer>
    </div>
  </nav>
</header>
<script src="https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/js.min/core-header.min.1886efdfaa09be872aaee4fa203b7078.gz.js"></script>
</div>
<main id="main" tabindex="-1">
    <div class="page-content page-content--story  story-type--core " data-modules="/fe-api/v2/modules?page=00000184-5a27-df5e-af8c-fb6707be0000" data-ad-slot-insertion-interval="0" data-ad-slot-first-insertion="1" data-viewport-ad-slot-id="" style="margin: 0 auto !important;">
`}
${children}
</div>
</main>
${!showArticle ? '' : `
      <div class="page-footer">
        <footer class="footer">
          <nav class="footer__group footer__group--links" role="contentinfo">
            <ul>
              <li>
                About Us</li>
              <li>
                null</li>
              <li>
                <a href="https://qablue.ops.politico.com/subscribe/breaking-news-alerts" target="_blank" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=3&amp;lcol=1">Breaking News Alerts</a></li>
              <li>
                <a href="https://qablue.politico.com/employment" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=4&amp;lcol=1">Careers</a></li>
              <li>
                <a href="https://qablue.politico.com/payment" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=5&amp;lcol=1">Credit Card Payments </a></li>
              <li>
                <a href="http://edition.pagesuite-professional.co.uk/Launch.aspx?bypass=true&amp;PBID=74262970-aa07-44b3-80c8-21fa8a8ac376" target="_blank" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=6&amp;lcol=1">Digital
                  Edition</a></li>
              <li>
                <a href="https://qablue.politico.com/faq" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=7&amp;lcol=1">POLITICO FAQ</a></li>
              <li>
                <a href="https://qablue.politico.com/feedback" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=8&amp;lcol=1">Feedback</a></li>
              <li>
                <a href="https://qablue.politico.com/story14" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=9&amp;lcol=1">Headlines</a></li>
              <li>
                <a href="https://qablue.politico.com/news/photos" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=10&amp;lcol=1">Photos</a></li>
              <li>
                <a href="http://www.powerjobs.com/" target="_blank" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=11&amp;lcol=1">POWERJobs</a></li>
              <li>
                Press</li>
              <li>
                <a href="https://qablue.politico.com/subscriptions" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=13&amp;lcol=1">Print Subscriptions</a></li>
              <li>
                <a href="https://qablue.politico.com/rss" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=14&amp;lcol=1">RSS</a></li>
              <li>
                <a href="https://qablue.politico.com/sitemap" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=15&amp;lcol=1">Site Map</a></li>
            </ul>

            <ul>
              <li>
                <a href="https://qablue.politico.com/terms-of-service" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=1&amp;lcol=2">Terms of Service</a></li>
              <li>
                <a href="https://qablue.politico.com/privacy" target="_top" class="js-tealium-tracking" data-tracking="mpos=na&amp;mid=site_footer&amp;lindex=2&amp;lcol=2">Privacy Policy</a></li>
            </ul>

          </nav>
          <div class="footer__group footer__group--legal">
            <p class="footer__copyright"> © 2021 POLITICO LLC</p>
          </div>
        </footer>
        `}
  </body>`;
}
