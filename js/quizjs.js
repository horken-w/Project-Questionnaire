!function (window, document){
	'user strict';

	String.prototype.dot = function() {
    return '.' + this;
  };
  String.prototype.hashtag = function() {
    return '#' + this;
  };

  function addEvent(obj,evt,fn, arg) {
    if (obj.addEventListener)
      obj.addEventListener(evt,function(){fn(arg)},false);
    else if (obj.attachEvent)
      obj.attachEvent('on'+evt,function(){fn(arg)});
  }

  function createEl(el, classnames){
    var node=document.createElement(el);

    var joinWord = function(sentence, word) { return sentence + ' ' + word;}
    var reduce = function(callback, initialValue, array) {
      var working = initialValue;
       for (var i = 0; i < array.length; i = i + 1) {
            working = callback(working, array[i]);
        }
       return working;
    };

    typeof classnames==='string' ? node.className += classnames : 
    typeof classnames==='object' ? node.className += reduce(joinWord, '', classnames): '';
      
    return node;
  }

  function quizsBox(element){
    this.w=$(document);
    this.el=$(element);
    this.init();
  }

  var items={
        rootEl: 'root',
        addGroupbtn: 'group',
        addSingleline: 'singleline',
        addMultline: 'textarea',
        addRadiobox: 'radiobox',
        addCheckbox: 'checkbox',
        addmultRadio: 'likertscale',
        itemNodeName: 'li',
        listClass: 'dd-list',
        itemClass: 'dd-item',
        dragClass: 'dd-dragel',
        handleClass: 'dd-handle',
        contentClass: 'dd3-content',
        deletebtn: 'icon-del'
      };
      var divDrag=$(createEl('div', [items.handleClass, 'dd3-handle'])),
          divTxt=$(createEl('div', 'dd3-content')),
          divHide=$(createEl('div', ['answer', 'insidefiled'])),
          iconRemove=$(createEl('div', 'icon-btn')).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('delete'));

  quizsBox.prototype={
    init: function(){
      var _this=this, id=$('[id]');

      id.map(function(i, val){
        _this.creatItemListener(val.id.hashtag());
      });
      
      if(this.el.find(items.addGroupbtn.dot()).length > 0){
        this.el.find(items.addGroupbtn.dot()).first().addClass('active');
        this.el.find(items.addGroupbtn.dot()).map(function(i, val){
          addEvent(val, 'click', _this.bildingSelected, this);
        })
        if(this.el.find(items.itemClass.dot()).length>0){
          this.el.find(items.deletebtn.dot()).map(function(i, val){
            addEvent(val, 'click', _this.removeItem, this.parentElement);
          })
          this.el.find(items.contentClass.dot()).map(function(i, val){
            addEvent(val, 'click', _this.bildingOToggleWin, this);
          })
        }
        
      }
    },
    creatItemListener:function(addbtn){
      var _this=this, active=$(addbtn);
      var _li=createEl(items.itemNodeName, items.itemClass);

      switch (addbtn){
        case items.addGroupbtn.hashtag():
          addEvent(active[0], 'click', _this.groupCreat, _this.bildingSelected);
          break;
        case items.addSingleline.hashtag():
          addEvent(active[0], 'click', _this.singInputCreat, _this);
          break;
        case items.addMultline.hashtag():
          addEvent(active[0], 'click', _this.multInputCreat, _this);
          break;
        case items.addRadiobox.hashtag():
          addEvent(active[0], 'click', _this.radioBoxCreat, _this);
          break;
        case items.addCheckbox.hashtag():
          addEvent(active[0], 'click', _this.checkBoxCreat, _this);
          break;
        case items.addmultRadio.hashtag():
          addEvent(active[0], 'click', _this.multradioBoxCreat, _this);
          break;
      }
      
    },
    groupCreat:function(active){
      var _this=this, section=$('<section class="group" />') ;
      var wrapper=_this.wrap === undefined ? $(items.listClass.dot()).first() : _this.wrap;
      section.append($('<h1 class="dd-handle" />').append($('<input/>',{
        class: 'formtextInput titletextarea',
        row: 1,
        value: '題組名稱'
      })));
      addEvent(section[0], 'click', active, section[0]);      
      section.append($('<div id="root" class="dd formfields"/>').append($('<ol class="'+items.listClass+'"/>')));
      wrapper.append($('<li class="'+items.itemClass+'"/>').append(section));
    },
    singInputCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('單欄位輸入')));
        _li.append(divHide.clone().addClass('single')
          .append($('<textarea rows="1" placeholder="請輸入你的內容..."/>')
          .addClass('formtextInput singleinput ')));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!');      
    },
    multInputCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('多欄位輸入')));
        _li.append(divHide.clone()
          .append($('<textarea rows="4" placeholder="請輸入你的內容..."/>')
          .addClass('formtextInput singleinput ')));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
    },
    radioBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('單選題型')));
        _li.append(divHide.clone());
        _li.find('.answer').append(active.subTextareaCreate(active, _li.find('.answer')));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
    },
    checkBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="4"/>')
          .addClass('formtextInput singleline').val('多選題型')));
        _li.append(divHide.clone());
        _li.find('.answer').append(active.subTextareaCreate(active, _li.find('.answer')));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
      
    },
    multradioBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('李克特量表')));
        _li.append(divHide.clone());
        _li.find('.answer').append(active.subTextareaCreate(active, _li.find('.answer')));
        _li.appendTo($(rootNode));
        addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('請先建立/選擇群組在新增內容!!'); 
    },
    subTextareaCreate: function(active ,target){
      var nodes=$('<div class="answerwrap"/>'),
          addCreate=$(createEl('div', ['icon-add', 'answer-add'])).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('create')),
          delCreate=$(createEl('div', ['icon-del', 'answer-del'])).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('delete'));
      if (target !== undefined){
        nodes.append(delCreate);
        nodes.append(addCreate);
        addEvent(addCreate[0], 'click', active.subTextareaCreate, target);
        addEvent(delCreate[0], 'click', active.removeItem, target[0].children);
        nodes.append($('<label/>', {
          class: 'text answer-title',
          for: 'answer',
          text: '選項: '
        }))
        nodes.append($('<input/>', {
          class: 'select answer-input',
          type: 'text',
          placeholder: '請輸入你的選項... '
        })).appendTo(target);
      }else{
        nodes.append(delCreate);
        nodes.append(addCreate);
        nodes.append($('<label/>', {
          class: 'text answer-title',
          for: 'answer',
          text: '選項: '
        }))
        nodes.append($('<input/>', {
          class: 'select answer-input',
          type: 'text',
          placeholder: '請輸入你的選項... '
        }))
        return nodes;
      };
    },
    bildingSelected:function(e){ //select group
      var _this=e;
      $(items.addGroupbtn.dot()).removeClass('active');
      $(_this).addClass('active');
    },
    findParentExites: function(){
      return  document.getElementsByClassName('active')[0] === undefined ? false : 
                document.getElementsByClassName('active')[0].getElementsByClassName('dd-list') ? document.getElementsByClassName('active')[0].getElementsByClassName('dd-list') : false;
     
    },
    bildingOToggleWin: function(target){ //content open/close
      classie.toggle(target.nextElementSibling, 'detail-showout');
    },
    removeItem: function(item){
    var e = typeof item[0] ==='object' ? e=item[0] : e=item;

      e.parentElement.children.length-1 > 0 ? item.remove(): 
        alert('題目無法全部刪除!');
    }
  }


  $(function(){
    $('.formfields').nestable();
    var quiz=new quizsBox('#root');

  })
}(window, document)
