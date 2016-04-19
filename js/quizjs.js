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
    this.v=window;
    this.el=$(element);
    this.init();
  }

  var items={
        rootEl: 'root',
        addGroupbtn: 'group',
        exportDate: 'submi',
        addSingleline: 'sigle',
        addMultline: 'txtar',
        addRadiobox: 'radio',
        addCheckbox: 'check',
        addmultRadio: 'liker',
        itemNodeName: 'li',
        listClass: 'dd-list',
        itemClass: 'dd-item',
        dragClass: 'dd-dragel',
        handleClass: 'dd-handle',
        contentClass: 'dd3-content',
        deletebtn: 'icon-del',
        createbtn: 'icon-add'
      };
      var divDrag=$(createEl('div', [items.handleClass, 'dd3-handle'])),
          divTxt=$(createEl('div', 'dd3-content')),
          divHide=$(createEl('div', ['answer', 'insidefiled'])),
          iconRemove=$(createEl('div', 'icon-btn')).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('delete')),
          sentseq={};

  quizsBox.prototype={
    init: function(){
      var _this=this, id=$('[id]'), _sidebar=$("#sidebar");

      id.map(function(i, val){
        var txtarray=val.id.slice(0,5);
        _this.creatItemListener(txtarray, val.id.hashtag());
      });

      this.w.find($('input[name="quiztype"]')).on('click', function(e){
        if(this.value === 'person'){
          $('.tablehide').removeClass('tablehide');
          $('.denysele').removeClass('denysele');
        }else{          
          $('.table').addClass('tablehide').delay(1000).queue(function(){
            $('.boxsize').addClass('denysele').dequeue();
          });
        }        
      });

      addEvent(this.v, 'scroll', _this.sideBarAnimate, _sidebar);

      $('a').on('click', function(e){ //remove heperlink function
        e.preventDefault();
      })

      /*Demo use Start*/
      $('textarea').each(function(i,v){
          addEvent(v, 'keyup', _this.inputboxAutoExpand, $(v));
        })

      if(this.el.find(items.addGroupbtn.dot()).length > 0){
        this.el.find(items.addGroupbtn.dot()).first().addClass('active');
        this.el.find(items.addGroupbtn.dot()).map(function(i, val){
          addEvent(val, 'click', _this.bildingSelected, this);
          addEvent(val.childNodes[1].childNodes[3], 'click', _this.removeItem, this.parentElement);
          addEvent(val.childNodes[1], 'mouseenter', _this.hideShowTrashbin, val.childNodes[1].childNodes[3]); 
          addEvent(val.childNodes[1], 'mouseleave', _this.hideShowTrashbin, val.childNodes[1].childNodes[3]); 
        })
        
        if(this.el.find(items.itemClass.dot()).length>0){
          this.el.find(items.deletebtn.dot()).map(function(i, val){
            addEvent(val, 'click', _this.removeItem, this.parentElement);
          })
          this.el.find(items.createbtn.dot()).map(function(i, val){
            addEvent(val, 'click', _this.subTextareaCreate, this.parentElement.parentElement);
          })
          // this.el.find(items.contentClass.dot()).map(function(i, val){
          //   addEvent(val, 'click', _this.bildingOToggleWin, this);
          // })
        }
      }
      /*Demo use End*/
    },
    creatItemListener:function(action, addbtn){
      var _this=this, active=$(addbtn)[0];

      switch (action){
        case items.addGroupbtn:
          addEvent(active, 'click', _this.groupCreat, _this);
          break;
        case items.addSingleline:
          addEvent(active, 'click', _this.singInputCreat, _this);
          break;
        case items.addMultline:
          addEvent(active, 'click', _this.multInputCreat, _this);
          break;
        case items.addRadiobox:
          addEvent(active, 'click', _this.radioBoxCreat, _this);
          break;
        case items.addCheckbox:
          addEvent(active, 'click', _this.checkBoxCreat, _this);
          break;
        case items.addmultRadio:
          addEvent(active, 'click', _this.multradioBoxCreat, _this);
          break;        
        case items.exportDate:
          addEvent(active, 'click', _this.exportData, _this);
          break;
        default :
          break;
      }
    },
    groupCreat:function(active){
      var _this=this, section=$('<section class="group" data-group_seq=0 data-is_base_info=true/>') ;
      var wrapper=_this.wrap === undefined ? $(items.listClass.dot()).first() : _this.wrap;
      
      $('<div class="hgtitle" />').append($('<h1 class="dd-handle" />').append($('<input/>',{
        class: 'formtextInput titletextarea',
        row: 1,
        value: 'Group'
      }))).appendTo(section);
      section.find('.hgtitle').append(iconRemove.clone());
      addEvent(section.find('.hgtitle')[0], 'mouseenter', active.hideShowTrashbin, section.find('.hgtitle')[0].childNodes[1]); 
      addEvent(section.find('.hgtitle')[0], 'mouseleave', active.hideShowTrashbin, section.find('.hgtitle')[0].childNodes[1]); 
      addEvent(section[0], 'click', active.bildingSelected, section[0]);
      section.append($('<div class="dd formfields"/>').append($('<ol class="'+items.listClass+'"/>')));
      wrapper.append($('<li class="'+items.itemClass+'"/>').append(section));
      addEvent(section.find('.icon-btn')[0], 'click', active.removeItem, section[0].parentElement);
    },
    singInputCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.attr({'data-type': 0, 'data-attribute': 0, 'data-sequence': 1});
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('Question(single-line)')));
        _li.append(divHide.clone().addClass('single')
          .append($('<textarea rows="1" placeholder="Comments..."/>')
          .addClass('formtextInput singleinput ')));
        _li.find('textarea').each(function(i,v){
          addEvent(v, 'keyup', active.inputboxAutoExpand, $(v));
        })
        _li.appendTo($(rootNode));
        active.callingNestable(_li.parent().parent());
        // addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('Please select / created group before you create items!!');   
    },
    multInputCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.attr({'data-type': 0, 'data-attribute': 1, 'data-sequence': 1});
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('Question(muti-line)')));
        _li.append(divHide.clone()
          .append($('<textarea rows="4" placeholder="Comments..."/>')
          .addClass('formtextInput singleinput ')));        
        _li.find('textarea').each(function(i,v){
          addEvent(v, 'keyup', active.inputboxAutoExpand, $(v));
        })
        _li.appendTo($(rootNode));        
        active.callingNestable(_li.parent().parent());
        // addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('Please select / created group before you create items!!'); 
    },
    radioBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.attr({'data-type': 0, 'data-attribute': 2, 'data-sequence': 1});
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('Question(radiobox)')));
        _li.append(divHide.clone());
        active.subTextareaCreate(_li.find('.answer')[0], active);
        _li.appendTo($(rootNode));        
        active.callingNestable(_li.parent().parent());
        // addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('Please select / created group before you create items!!'); 
    },
    checkBoxCreat:function(active){
      var rootNode=active.findParentExites(),
          _li=$(createEl(items.itemNodeName, items.itemClass));
      if(rootNode){
        _li.attr({'data-type': 0, 'data-attribute': 3, 'data-sequence': 1});
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="4"/>')
          .addClass('formtextInput singleline').val('Question(checkbox)')));
        _li.append(divHide.clone());
        active.subTextareaCreate(_li.find('.answer')[0], active);
        _li.appendTo($(rootNode));        
        active.callingNestable(_li.parent().parent());
        // addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('Please select / created group before you create items!!'); 
      
    },
    multradioBoxCreat:function(active){
      var rootNode=active.findParentExites(), lists=['Agree', 'Like', 'Approval', 'Satisfacty'],
          _li=$(createEl(items.itemNodeName, items.itemClass)), _select=$('<select name="favorate" class="select answer-input" />');
      if(rootNode){
        _li.attr({'data-type': 0, 'data-attribute': 4, 'data-sequence': 1});
        _li.append(iconRemove.clone());
        addEvent(_li[0].children[0], 'click', active.removeItem, _li);
        _li.append(divDrag.clone().text('drag'));
        _li.append(divTxt.clone().append($('<textarea rows="2"/>')
          .addClass('formtextInput singleline').val('Question(likertScale)')));
        _li.append(divHide.clone());
        lists.map(function(val, i){
          _select.append($('<option value="'+val+'">'+val+'</option>'))
        })
        _li.find('.answer').append($('<div class="answerwrap"/>'));
        $('<label/>', {
          class: 'text answer-title',
          for: 'answer',
          text: 'Type: '
        }).appendTo(_li.find('.answerwrap'));
        _li.find('.answerwrap').append(_select);
        _li.appendTo($(rootNode));
        active.callingNestable(_li.parent().parent());
        // addEvent( _li.find(items.contentClass.dot())[0],'click', active.bildingOToggleWin, _li.find(items.contentClass.dot())[0]);
      }else alert('Please select / created group before you create items!!'); 
    },
    subTextareaCreate: function(target ,active){
      var nodes=$('<div class="answerwrap"/>'),
          addCreate=$(createEl('div', ['icon-add', 'answer-add'])).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('create')),
          delCreate=$(createEl('div', ['icon-del', 'answer-del'])).append($(createEl('i', ['material-icons', 'icon-small', 'icon-color'])).text('delete'));

        nodes.append(delCreate);
        nodes.append(addCreate.clone());
        // addEvent(nodes.find('.icon-add')[0], 'click', active.subTextareaCreate, target);
        nodes.find('.icon-add').on('click', function(){
          active.subTextareaCreate(target, active);
        });
        nodes.append($('<label/>', {
          class: 'text answer-title',
          for: 'answer',
          text: 'options: '
        }))
        nodes.append($('<input/>', {
          class: 'select answer-input',
          type: 'text',
          placeholder: 'create your selection here... '
        })).appendTo(target);
        addEvent(delCreate[0], 'click', active.removeItem, nodes);
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
    inputboxAutoExpand: function(target){
      var offset = target[0].offsetHeight - target[0].clientHeight;
      target.css('height', 'auto').css('height', target[0].scrollHeight + offset);
    },
    hideShowTrashbin:function(target){
      $(target).toggleClass('showout');
      
    },
    // bildingOToggleWin: function(target){ //content open/close
    //   classie.toggle(target.nextElementSibling, 'detail-showout');
    // },
    removeItem: function(item){
      var e = typeof item[0] ==='object' ? e=item[0] : e=item;

      e.parentElement.children.length-1 > 0 ? item.remove(): 
        alert('Group can not be empty!');
    },
    callingNestable: function(target){
      target.nestable();
    },
    sideBarAnimate: function(target){
      var objHeight=document.getElementsByTagName('header')[0].offsetHeight;
      // if(window.scrollY > objHeight) $('#sidebar').addClass('showout'); //only show the sidebar after scroll down below banner 
      // else $('#sidebar').removeClass('showout'); 
      target.stop()
        .animate({"marginTop": ($(window).scrollTop() + 30) + "px"}, "slow" );
    },
    serialize: function(){
      var quizstype=['group_title', 'group_seq', 'is_base_info', 'questions'], 
          group=[ 'description', 'type', 'attribute', 'sequence', 'required', 'answers'], 
          formpaper=document.getElementsByTagName('form')[0];
      // var arrToObj= function(ind, el, array){
      //   array.reduce(function(val, i) {
      //     sentseq[ind][i] = el.data(i); //a, b, c
      //     return sentseq[ind];
      //   }, {});
      // }
      
      var setAnswer=function(el, isInputbox){
        var answerBox=[];
        if(isInputbox){
          if (el.find('input:checked').length>0){
            el.find('input:checked').each(function(i, val){
              var answer={};
              answer.description=val.parentElement.nextElementSibling.innerText;
              answer.type=$(val).data('type');
              answer.attribute=$(val).data('attribute');
              answer.sequence=$(val).data('sequence');
              answer.required=true;
              answer.answers=['female', 'male', 'secret'];
              answerBox.push(answer);
            })
          }
        }
        return answerBox;
      }

      var objToArr= function(el, array, section){ //personal detail
        var obj={};
        if(section){
          array.reduce(function(val, i) {
            if (el.data(i)!==undefined) 
              obj[i] = el.data(i); 
            else 
              obj[i] = [];
            return obj;
          }, {});
          obj.group_title=el.find('h1> input').val();
        }else{
          array.reduce(function(val, i) {
            if (el.data(i)!==undefined) 
              obj[i] = el.data(i); 
            else 
              obj[i] = [];
            return obj;
          }, {});
          obj.group_title='個人資料';
        }        
        return obj;
      };

      var setQuestion=function(el, array){ //question detail
        var objBox=[], arraylist=array, nodes=el.find('.dd-item');
        for(var i=0; i<nodes.length; i++){
          var node=nodes[i],obj={};
          array.reduce(function(val, inx) {
            if ($(node).data(inx)!==undefined) 
              obj[inx] = $(node).data(inx); 
            else 
              obj[inx] = [];
            return obj;
          }, {});
          obj.description=$(node).find('textarea:first')[0].value;
          obj.required=true;
          if(obj.attribute === 2 || obj.attribute === 3 || obj.attribute === 4){
            switch (obj.attribute){
              case 2:
              case 3:
                var e=[];
                $(node.childNodes[3].children).each(function(i, v){
                 e.push($(v).find('input').val());
                })
                 obj.answers=e;
                break;
              case 4:
                obj.typeOfScale=el.find('select option:selected').val();
                break;
            }            
          }             
          objBox.push(obj);
        }
        return objBox;
      };

      sentseq['title']=formpaper[0].value;
      sentseq['description']=formpaper[1].value;
      sentseq['footer']=formpaper[2].value;
      sentseq['target']=document.querySelector('input[name="quiztype"]:checked').value;
      sentseq['groups']=[];
      sentseq['groups'].push(objToArr($('.pr-group'), quizstype, false));
      sentseq.groups[0].questions=setAnswer($('.pr-table'), group);
      $('section.group').map(function(i, val){
        sentseq['groups'].push(objToArr($(val), quizstype, true));        
        sentseq.groups[i+1].questions=setQuestion($(val), group);        
      })
      //localStorage.setItem('quiz', JSON.stringify(sentseq));
      console.log(sentseq);
    },
    exportData: function(tooling){
      return tooling.serialize();
    }
  }


  $(function(){
    // $.ajaxSetup({async: false});
    // let avaliable=false, _data, dataurl= './questionnaire/quizfile.json';
    // $.getJSON(dataurl, function(data){ _data=data; avaliable=true;})
    //  .fail(function(){
    //    avaliable=false;
    // });

    var quiz=new quizsBox('#root');
      quiz.callingNestable($('.formfields'));
  })
}(window, document)
