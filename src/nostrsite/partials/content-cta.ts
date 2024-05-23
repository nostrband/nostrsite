export const CONTENT_CTA_PARTIAL = `{{{html}}}
<aside class="gh-post-upgrade-cta">
    <div class="gh-post-upgrade-cta-content" style="background-color: {{@site.accent_color}}">
        {{#has visibility="paid"}}
            <h2>This {{#is "page"}}page{{else}}post{{/is}} is for paying subscribers only</h2>
        {{/has}}
        {{#has visibility="members"}}
            <h2>This {{#is "page"}}page{{else}}post{{/is}} is for subscribers only</h2>
        {{/has}}
        {{#has visibility="tiers"}}
            <h2>This {{#is "page"}}page{{else}}post{{/is}} is for subscribers on the {{tiers}} only </h2>
        {{/has}}
        {{#if @member}}
            <a class="gh-btn" data-portal="account/plans" href="#/portal/account/plans" style="color:{{@site.accent_color}}">Upgrade your account</a>
        {{else}}
            <a class="gh-btn" data-portal="signup" href="#/portal/signup" style="color:{{@site.accent_color}}">Subscribe now</a>
            <p><small>Already have an account? <a data-portal="signin" href="#/portal/signin">Sign in</a></small></p>
        {{/if}}
    </div>
</aside>
`;