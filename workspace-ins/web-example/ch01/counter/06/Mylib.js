const Mylib = (() => {
  let _root;
  let _stateValue;
  // 지정한 속성과 자식 요소를 가지는 요소 노드를 생성해서 반환
  const createElement = (tag, props, ...children) => {
    // 요소 노드 생성
    const elem = document.createElement(tag);

    // 속성 추가
    if(props){
      for(const attrName in props){
        const value = props[attrName];
        if(attrName.startsWith('on')){
          elem.addEventListener(attrName.toLowerCase().substring(2), value);
        }else{
          elem.setAttribute(attrName, value);
        }
      }
    }

    // 자식 요소 추가
    for(let child of children){
      if(typeof child === 'string' || typeof child === 'number'){
        child = document.createTextNode(child);
      }else if(typeof child === 'function'){
        child = child();
      }
      elem.appendChild(child);
    }

    return elem;
  };

  // 루트노드를 관리하는 객체를 생성
  const createRoot = (rootNode) => {
    let _appComponent;
    return _root = {
      // 루트노드 하위에 지정한 컴포넌트를 렌더링 한다.
      render(appFn){
        _appComponent = _appComponent || appFn;
        if(rootNode.firstChild){
          rootNode.firstChild.remove();
        }
        rootNode.appendChild(_appComponent());
      }
    };
  };

  // 상태값을 등록
  const useState = (initValue) => {
    if(_stateValue === undefined){
      // 최초 한번만 실행
      _stateValue = initValue;
    }

    // 상태값을 변경하는 함수
    function setValue(newValue){
      _stateValue = newValue;

      _root.render();
    }

    return [_stateValue, setValue];
  }

  return { createElement, createRoot, useState };
})();

export default Mylib;