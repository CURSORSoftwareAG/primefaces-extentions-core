/**
 * PrimeFaces Extensions InputNumber Widget.
 *
 * @author Mauricio Fenoglio
 */
PrimeFacesExt.widget.InputNumber = PrimeFaces.widget.BaseWidget.extend({

	/**
	 * Initializes the widget.
	 * 
	 * @param {object} cfg The widget configuration.
	 */
	init : function(cfg) {
		this._super(cfg);
		this.inputInternal = $(this.jqId + '_hinput');
		this.inputExternal = $(this.jqId + '_input');
		this.plugOptArray =   cfg.pluginOptions;
		this.valueToRender =  cfg.valueToRender;
		this.disabled = cfg.disabled;      
                
		var _self = this;             

		//bind events if not disabled
		if (this.disabled) {
			this.inputExternal.attr("disabled", "disabled");
			this.inputExternal.addClass("ui-state-disabled");
			this.inputInternal.attr("disabled", "disabled");
		}                

		//copy to hidden input the cleaned value
		this.inputExternal.change(function() {                    
                    if(_self.inputExternal.val()!=''){
                        cleanVal = _self.inputExternal.autoNumeric('get');                  
			_self.inputInternal.attr('value', cleanVal);
                    }else{
                        _self.inputInternal.removeAttr('value');
                    }
		})

		//Client Behaviors
		if (this.cfg.behaviors) {
			PrimeFaces.attachBehaviors(this.inputExternal, this.cfg.behaviors);
		}
                
		this.inputExternal.autoNumeric('init', this.plugOptArray);
                       
		if (this.valueToRender != ""){
			//set the value to the external input the plugin will format it.                 
			this.inputExternal.autoNumeric('set',this.valueToRender);                     
			//then copie the value to the internal input
			cleanVal = _self.inputExternal.autoNumeric('get');              
			_self.inputInternal.attr('value', cleanVal);
		}
	},
        
	enable : function() {
		this.inputExternal.removeAttr("disabled");
		this.inputExternal.removeClass("ui-state-disabled");
		this.inputInternal.removeAttr("disabled");
		this.disabled = false;
	},

	disable : function() {
		this.inputExternal.attr("disabled", "disabled");
		this.inputExternal.addClass("ui-state-disabled");
		this.inputInternal.attr("disabled", "disabled");
		this.disabled = true;
	}
});
