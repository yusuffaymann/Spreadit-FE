import {useEffect} from 'react';

export default function ContinueWith(props){

    function handleCallBackResponse(response){
        props.setGoogleToken(response.credential)
    }

    useEffect(()=> {
          /*global google*/
              google.accounts.id.initialize({
              client_id: "983024045676-9bfe3k8g098glni21l9ka2k8qcah2uks.apps.googleusercontent.com",
              callback: handleCallBackResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("continuewith"),
                {theme:"outline", size:"large",
               }
            )
    },[])

    return(
        <div className="continue">
            <div id= "continuewith"></div>
        </div>
    )
}

