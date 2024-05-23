export const NAVIGATION_PARTIAL = `<ul class="nav">
  {{#foreach navigation}}
  <li class="{{link_class for=(url) class=(concat "nav-" slug)}}"><a href="{{url absolute="true"}}">{{label}}</a></li>
  {{/foreach}}
</ul>
`;