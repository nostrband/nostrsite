export const CANCEL_LINK_PARTIAL = `{{#if cancel_at_period_end}}
    <a class="{{class}}" data-members-continue-subscription="{{id}}" href="javascript:">
        {{continueLabel}}
    </a>
{{else}}
    <a class="{{class}}" data-members-cancel-subscription="{{id}}" href="javascript:">
        {{cancelLabel}}
    </a>
{{/if}}

<span class="{{errorClass}}" data-members-error><!-- error message will appear here --></span>
`;