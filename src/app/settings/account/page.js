'use client';
import  Styles from "./page.module.css";
import React, { useEffect ,useState} from "react";
import Deleteaccount from "../../components/UI/Deletebutton";
import Layout from "../SettingsLayout";
import Changeemailpassword from "../../components/UI/Changebutton";
import Changegendercountry from "../../components//UI/Listbutton";
import Connectbutton from "../../components/UI/Connectbutton";

const Home=()=> {
  const [userData, setUserData] = useState(null);
/*   const [Ygender,setYgender]=useState("MAN");
  const handleItemClick = (item) => {
    setYgender(item);
    console.log(item);
  }; */


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/settings/account');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setUserData(data);
        /* setYgender(data.gender); */
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
    fetchData();
  }, []);

  if (!userData) {
    // Render loading state or return null
    return <div>Loading...</div>;
  }

  const {username, email, password, gender, country, connected } = userData;
  async function updateGender(newgender) {
    try {
        const response = await fetch('http://localhost:3001/settings/account', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gender: newgender
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update gender');
        }

        //const data = await response.json();
        console.log("gender changed to "+newgender);
    } catch (error) {
        console.error('Error updating gender:', error.message);
    }
}
async function updateCountry(newcountry) {
  try {
      const response = await fetch('http://localhost:3001/settings/account', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              country: newcountry
          })
      });

      if (!response.ok) {
          throw new Error('Failed to update country');
      }

      //const data = await response.json();
      console.log("country changed to "+newcountry);
  } catch (error) {
      console.error('Error updating country:', error.message);
  }
}


  const genders=["MAN","WOMAN"];
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
  return (
    <div className={Styles.App}>
      <div className={Styles.bigcontainer}>
        <Layout index={0} />
        <div className={Styles.sectioncontainer}>
            <div className={Styles.sectionname}>
              <h1 className={Styles.accountheader}>Account Settings</h1>
              <h3 className={Styles.subheader}>ACCOUNT PREFERENCES</h3>
              <hr className={Styles.line}></hr>
            </div>
            <Changeemailpassword type="Email address" description={email} />
            <Changeemailpassword type="Password" description="Password must be at least 8 characters long" />
            <Changegendercountry list={genders} initialv={gender} type={"Gender"}   choose={(newgender) => updateGender(newgender)} />
            <Changegendercountry list={countries} initialv={country} type={"Country"} choose={(newcountry) => updateCountry(newcountry)} />
        </div>
        <div className={Styles.sectioncontainer}>
            <div className={Styles.sectionname}>
              <h3 className={Styles.subheader}>CONNECTED ACCOUNTS</h3>
              <hr className={Styles.line}></hr>
            </div>
            <Connectbutton type="Google" description="Connect account to log in to Reddit with Google" condition={connected}/>
        </div>
        <div className={Styles.sectioncontainer}>
          <div className={Styles.sectionname}>
            <h3 className={Styles.subheader}>DELETE ACCOUNT</h3>
            <hr className={Styles.line}></hr>
          </div>
          <Deleteaccount password={password} username={username}/>
        </div>
      </div>
    </div>
  );
}

export default Home;