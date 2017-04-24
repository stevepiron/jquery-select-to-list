/**!
 * @author Steve Piron <https://twitter.com/stevepiron>
 * @requires jQuery
 *
 * A jQuery plugin turning selects into lists.
 */
(function( $ ) {

    var defaults;
    var params;

    var $document = $(document);

    // ====================================================================== //
    // Functions
    // ====================================================================== //

    /**
     * @function `bindBoth`
     *
     * Binds the original select and the created list together.
     *
     * @param $originalSelect {jQuery} - the original select.
     * @param $createdList {jQuery} - the list created by this plugin.
     * @param index {integer} - a unique number to bind both.
     */
    function bindBoth($originalSelect, $createdList, index) {
        $originalSelect.attr('data-rel', index);
        $createdList.attr('data-rel', index);
    }

    /**
     * @function `turnIntoList`
     *
     * Turns a given select into a list.
     *
     * @param $select {jQuery} - the select to transform.
     * @param i {integer} - the loop index.
     */
    function turnIntoList( $select, i ) {
        var $option = $select.find('option');
        var className = (params.classes !== 'js-created-list') ?
            'js-created-list' : '';
        var listHtml = '<ul class="'+params.classes+' '+className+
            '" id="js-created-list-'+i+'">';
        $option.each(function(o, option) {
            var $this = $(option);
            var value = $this.val();
            var label = $this.text();
            var selected = $this.attr('selected');
            var attributesCount = params.attributesToKeep.length
            var attributes = '';
            if( attributesCount ) {
                for (var i = 0; i < attributesCount; i++) {
                    var attr = params.attributesToKeep[i];
                    var attrValue = $this.attr(attr);
                    if( attrValue !== undefined ) {
                        attributes += ' ' + attr + '="' + attrValue + '"';
                    }
                }
            }
            var tag = ['', ''];
            if( params.labelWrapTag ) {
                tag[0] =
                    '<'+params.labelWrapTag+
                    (params.labelWrapClasses.length ?
                        ' class="'+params.labelWrapClasses+'"' : '')+
                    '>';
                tag[1] = '</'+params.labelWrapTag+'>';
            }
            var liHtml = '<li class="'+params.itemClasses+
                (selected !== undefined ? ' '+params.selectedClass : '')+
                '" data-val="'+value+'"'+attributes+'>'+
                tag[0]+label+tag[1]+'</li>';
            listHtml += liHtml;
        });
        listHtml += '</ul>';
        var $list = $(listHtml);
        if( params.selectFirstIfNone ) {
            $list.find('li').eq(0).addClass(params.selectedClass);
        }
        bindBoth($select, $list, i);
        $list.insertAfter($select);
        if( params.onAfterInit ) {
            params.onAfterInit();
        }
    }

    /**
     * @function `markAsSelected`
     *
     * Marks a given list item as the only selected item in the list.
     *
     * @param $list {jQuery} - the ancestor of the list item.
     * @param $clickedLi {jQuery} - the list item to mark as selected.
     */
    function markAsSelected($list, $clickedLi) {
        var $li = $list.find('li');
        $li.removeClass(params.selectedClass);
        $clickedLi.addClass(params.selectedClass);
    }

    /**
     * @function `updateSelect`
     *
     * Updates the original select and visually updates the created list to show
     * the clicked list item as selected.
     *
     * @param $clickedLi {jQuery} - the clicked list item.
     *
     * 1. Quick escape if item is already selected.
     * 2. Trigger the change event when updating the select.
     */
    function updateSelect( $clickedLi ) {
        if( $clickedLi.hasClass(params.selectedClass) ) { /* [1] */
            return;
        }
        var $list = $clickedLi.parent();
        var link = $list.data('rel');
        var $select = $document.find('select[data-rel="'+link+'"]');
        var value = $clickedLi.data('val');
        $select.val(value).change(); /* [2] */
        markAsSelected($list, $clickedLi);
    }

    // ====================================================================== //
    // Plugin
    // ====================================================================== //

    $.fn.spSelectToList = function( options ) {

        /**
         * Note: using `return` keeps jQuery's chaining possibility
         */
        return this.each(function(i, inst) {

            var $this = $(inst);

            defaults = {
                classes: 'js-created-list',
                itemClasses: 'js-created-list__item',
                labelWrapTag: false,
                labelWrapClasses: false,
                attributesToKeep: [],
                selectFirstIfNone: false,
                selectedClass: 'is-selected',
                onAfterInit: false,
                onAfterSelect: false
            };

            params = $.extend( defaults, options );

            turnIntoList( $this, i );

            // ============================================================== //
            // On click
            // ============================================================== //

            /**
             * 1. Concatenate all classes together by replacing spaces for dots.
             */
            $document.on('click',
            '.'+params.itemClasses.replace(/\s+/g, '.'), function() { /* [1] */
                var $this = $(this);
                updateSelect($this);
                if( params.onAfterSelect ) {
                    params.onAfterSelect();
                }
            });

        });
    };

}( jQuery ));
