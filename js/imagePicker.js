// Image Picker
// by Rodrigo Vera
//
// Version 0.3.1
// Full source at https://github.com/rvera/image-picker
// MIT License, https://github.com/rvera/image-picker/blob/master/LICENSE
// Image Picker
// by Rodrigo Vera
//
// Version 0.3.0
// Full source at https://github.com/rvera/image-picker
// MIT License, https://github.com/rvera/image-picker/blob/master/LICENSE
(function(){var t,e,i,s,l=function(t,e){return function(){return t.apply(e,arguments)}},n=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};jQuery.fn.extend({imagepicker:function(e){return null==e&&(e={}),this.each(function(){var i;return i=jQuery(this),i.data("picker")&&i.data("picker").destroy(),i.data("picker",new t(this,s(e))),null!=e.initialized?e.initialized.call(i.data("picker")):void 0})}}),s=function(t){var e;return e={hide_select:!0,show_label:!1,initialized:void 0,changed:void 0,clicked:void 0,selected:void 0,limit:void 0,limit_reached:void 0},jQuery.extend(e,t)},i=function(t,e){return 0===jQuery(t).not(e).length&&0===jQuery(e).not(t).length},t=function(){function t(t,e){this.opts=null!=e?e:{},this.sync_picker_with_select=l(this.sync_picker_with_select,this),this.select=jQuery(t),this.multiple="multiple"===this.select.attr("multiple"),null!=this.select.data("limit")&&(this.opts.limit=parseInt(this.select.data("limit"))),this.build_and_append_picker()}return t.prototype.destroy=function(){var t,e,i,s;for(s=this.picker_options,e=0,i=s.length;i>e;e++)t=s[e],t.destroy();return this.picker.remove(),this.select.unbind("change"),this.select.removeData("picker"),this.select.show()},t.prototype.build_and_append_picker=function(){var t=this;return this.opts.hide_select&&this.select.hide(),this.select.change(function(){return t.sync_picker_with_select()}),null!=this.picker&&this.picker.remove(),this.create_picker(),this.select.after(this.picker),this.sync_picker_with_select()},t.prototype.sync_picker_with_select=function(){var t,e,i,s,l;for(s=this.picker_options,l=[],e=0,i=s.length;i>e;e++)t=s[e],t.is_selected()?l.push(t.mark_as_selected()):l.push(t.unmark_as_selected());return l},t.prototype.create_picker=function(){return this.picker=jQuery("<ul class='thumbnails image_picker_selector'></ul>"),this.picker_options=[],this.recursively_parse_option_groups(this.select,this.picker),this.picker},t.prototype.recursively_parse_option_groups=function(t,i){var s,l,n,r,c,o,h,a,p,u;for(a=t.children("optgroup"),r=0,o=a.length;o>r;r++)n=a[r],n=jQuery(n),s=jQuery("<ul></ul>"),s.append(jQuery("<li class='group_title'>"+n.attr("label")+"</li>")),i.append(jQuery("<li>").append(s)),this.recursively_parse_option_groups(n,s);for(p=function(){var i,s,n,r;for(n=t.children("option"),r=[],i=0,s=n.length;s>i;i++)l=n[i],r.push(new e(l,this,this.opts));return r}.call(this),u=[],c=0,h=p.length;h>c;c++)l=p[c],this.picker_options.push(l),l.has_image()&&u.push(i.append(l.node));return u},t.prototype.has_implicit_blanks=function(){var t;return function(){var e,i,s,l;for(s=this.picker_options,l=[],e=0,i=s.length;i>e;e++)t=s[e],t.is_blank()&&!t.has_image()&&l.push(t);return l}.call(this).length>0},t.prototype.selected_values=function(){return this.multiple?this.select.val()||[]:[this.select.val()]},t.prototype.toggle=function(t){var e,s,l;return s=this.selected_values(),l=""+t.value(),this.multiple?n.call(this.selected_values(),l)>=0?(e=this.selected_values(),e.splice(jQuery.inArray(l,s),1),this.select.val([]),this.select.val(e)):null!=this.opts.limit&&this.selected_values().length>=this.opts.limit?null!=this.opts.limit_reached&&this.opts.limit_reached.call(this.select):this.select.val(this.selected_values().concat(l)):this.has_implicit_blanks()&&t.is_selected()?this.select.val(""):this.select.val(l),i(s,this.selected_values())||(this.select.change(),null==this.opts.changed)?void 0:this.opts.changed.call(this.select,s,this.selected_values())},t}(),e=function(){function t(t,e,i){this.picker=e,this.opts=null!=i?i:{},this.clicked=l(this.clicked,this),this.option=jQuery(t),this.create_node()}return t.prototype.destroy=function(){return this.node.find(".thumbnail").unbind()},t.prototype.has_image=function(){return null!=this.option.data("img-src")},t.prototype.is_blank=function(){return!(null!=this.value()&&""!==this.value())},t.prototype.is_selected=function(){var t;return t=this.picker.select.val(),this.picker.multiple?jQuery.inArray(this.value(),t)>=0:this.value()===t},t.prototype.mark_as_selected=function(){return this.node.find(".thumbnail").addClass("selected")},t.prototype.unmark_as_selected=function(){return this.node.find(".thumbnail").removeClass("selected")},t.prototype.value=function(){return this.option.val()},t.prototype.label=function(){return this.option.data("img-label")?this.option.data("img-label"):this.option.text()},t.prototype.clicked=function(){return this.picker.toggle(this),null!=this.opts.clicked&&this.opts.clicked.call(this.picker.select,this),null!=this.opts.selected&&this.is_selected()?this.opts.selected.call(this.picker.select,this):void 0},t.prototype.create_node=function(){var t,e;return this.node=jQuery("<li/>"),t=jQuery("<img class='image_picker_image'/>"),t.attr("src",this.option.data("img-src")),e=jQuery("<div class='thumbnail'>"),e.click({option:this},function(t){return t.data.option.clicked()}),e.append(t),this.opts.show_label&&e.append(jQuery("<p/>").html(this.label())),this.node.append(e),this.node},t}()}).call(this);