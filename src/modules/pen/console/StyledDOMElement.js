import AceEditor from 'react-ace';

function StyledDomElement({ element }) {
   return (
      <AceEditor
         mode="html"
         name="show-element-in-console"
         defaultValue={element}
         readOnly
         showGutter={false}
         theme="twilight"
         height="1rem"
         minLines={1}
         maxLines={1}
         fontSize="1rem"
      />
   );
}

export default StyledDomElement;
