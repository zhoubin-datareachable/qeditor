/*! For license information please see 2611b2dc99534665bf6734ddfa6b8de4.js.LICENSE.txt */
ace.define("ace/mode/applescript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,i){"use strict";var o=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,n=function(){var e=this.createKeywordMapper({"support.function":"activate|beep|count|delay|launch|log|offset|read|round|run|say|summarize|write","constant.language":"AppleScript|false|linefeed|return|pi|quote|result|space|tab|true","support.type":"alias|application|boolean|class|constant|date|file|integer|list|number|real|record|string|text|character|characters|contents|day|frontmost|id|item|length|month|name|paragraph|paragraphs|rest|reverse|running|time|version|weekday|word|words|year",keyword:"about|above|after|against|and|around|as|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|contain|contains|continue|copy|div|does|eighth|else|end|equal|equals|error|every|exit|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|into|is|it|its|last|local|me|middle|mod|my|ninth|not|of|on|onto|or|over|prop|property|put|ref|reference|repeat|returning|script|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|try|until|where|while|whose|with|without"},"identifier");this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"comment",regex:"\\(\\*",next:"comment"},{token:"string",regex:'".*?"'},{token:"support.type",regex:"\\b(POSIX file|POSIX path|(date|time) string|quoted form)\\b"},{token:"support.function",regex:"\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"},{token:"constant.language",regex:"\\b(text item delimiters|current application|missing value)\\b"},{token:"keyword",regex:"\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference))\\b"},{token:e,regex:"[a-zA-Z][a-zA-Z0-9_]*\\b"}],comment:[{token:"comment",regex:"\\*\\)",next:"start"},{defaultToken:"comment"}]},this.normalizeRules()};o.inherits(n,r),t.AppleScriptHighlightRules=n})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(e,t,i){"use strict";var o=e("../../lib/oop"),r=e("../../range").Range,n=e("./fold_mode").FoldMode,a=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};o.inherits(a,n),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,i){var o=e.getLine(i);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var r=this._getFoldWidgetBase(e,t,i);return!r&&this.startRegionRe.test(o)?"start":r},this.getFoldWidgetRange=function(e,t,i,o){var r,n=e.getLine(i);if(this.startRegionRe.test(n))return this.getCommentRegionBlock(e,n,i);if(r=n.match(this.foldingStartMarker)){var a=r.index;if(r[1])return this.openingBracketBlock(e,r[1],i,a);var s=e.getCommentFoldRange(i,a+r[0].length,1);return s&&!s.isMultiLine()&&(o?s=this.getSectionRange(e,i):"all"!=t&&(s=null)),s}if("markbegin"!==t&&(r=n.match(this.foldingStopMarker))){a=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],i,a):e.getCommentFoldRange(i,a,-1)}},this.getSectionRange=function(e,t){for(var i=e.getLine(t),o=i.search(/\S/),n=t,a=i.length,s=t+=1,l=e.getLength();++t<l;){var c=(i=e.getLine(t)).search(/\S/);if(-1!==c){if(o>c)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=n)break;if(g.isMultiLine())t=g.end.row;else if(o==c)break}s=t}}return new r(n,a,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,i){for(var o=t.search(/\s*$/),n=e.getLength(),a=i,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++i<n;){t=e.getLine(i);var c=s.exec(t);if(c&&(c[1]?l--:l++,!l))break}if(i>a)return new r(a,o,i,t.length)}}.call(a.prototype)})),ace.define("ace/mode/applescript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/applescript_highlight_rules","ace/mode/folding/cstyle"],(function(e,t,i){"use strict";var o=e("../lib/oop"),r=e("./text").Mode,n=e("./applescript_highlight_rules").AppleScriptHighlightRules,a=e("./folding/cstyle").FoldMode,s=function(){this.HighlightRules=n,this.foldingRules=new a,this.$behaviour=this.$defaultBehaviour};o.inherits(s,r),function(){this.lineCommentStart="--",this.blockComment={start:"(*",end:"*)"},this.$id="ace/mode/applescript"}.call(s.prototype),t.Mode=s})),ace.require(["ace/mode/applescript"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));