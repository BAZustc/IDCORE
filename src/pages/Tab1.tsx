//  Copyright: (c) 2021, 0xFable, WhiteWhale Team
//  The MIT License

//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
import React, { ChangeEvent, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { IonContent, IonHeader, IonButtons, IonPage, IonTitle, IonToolbar, IonCard, IonItem, IonLabel, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonText } from '@ionic/react'
import { Header } from '../components/Header'
import './Tab1.css'
// import the component
import ReactSpeedometer from 'react-d3-speedometer'
import ButtonGrid from '../components/ButtonGrid'

const Tab1: React.FC = () => {
  const [currentUSTPrice, setCurrentUSTPrice] = React.useState(1.000)
  const [textColour, setTextColour] = React.useState('#FFFFFF')


  // Theming 
  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addListener((mediaQuery) => updateStyles(mediaQuery.matches))
  // Based on the query, determine the text colour. 
  function updateStyles(shouldUpdate) {
    shouldUpdate ? setTextColour('#FFFFFF') : setTextColour('#000000')
  }
  // callAPI is an abstraction used to make an API and return its JSON response
  const callAPI = async (url) => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }
    return response.json()
  }
  // fetchData is used to return a precise UST-USD coin price from the 1m chart.
  const fetchData = async () => {
    const data = { index: [], price: [], volumes: [] }
    const result = await callAPI('https://api.coingecko.com/api/v3/coins/terrausd/market_chart?vs_currency=usd&days=1&interval=1m')
    for (const item of result.prices) {
      data.index.push(item[0])
      data.price.push(item[1])
    }
    for (const item of result.total_volumes) data.volumes.push(item[1])
    return data
  }


  // add side effect to component for dummy UST Price
  React.useEffect(() => {
    // create interval
    const interval = setInterval(
      // set number every 3s between 1.20 and 0.80 UST
      () => {

        fetchData().then((chartData) => {
          setCurrentUSTPrice(parseFloat(chartData.price[chartData.price.length - 1].toPrecision(4)))
        }).catch((err) => {
          console.log("Found issue with price grab" + err)
          setCurrentUSTPrice(parseFloat((Math.random() * (0.90 - 1.10) + 1.10).toPrecision(4)))
        })
      },
      3000
    )

    // clean up interval on unmount
    return () => {
      clearInterval(interval)
    }
  })

  return (

    <IonPage>
      <IonHeader>
        {/* Header contains the Mobile/Desktop changing header with wallet integration */}
        <Header />

      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">White Whale - Info</IonTitle>
          </IonToolbar>

        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>UST Arb Vault</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {/* This Grid is responsible for ensuring the speedometer remains centered within the component*/}
            <IonGrid>
              <IonRow>
                <IonCol></IonCol>
                <IonCol size="auto"><ReactSpeedometer
                  minValue={0.95}
                  maxValue={1.05}
                  textColor={textColour}
                  value={currentUSTPrice}
                  height={160}
                  needleHeightRatio={0.7}
                  segments={10}
                  maxSegmentLabels={10}
                  // We set to text to empty as we use custom text components below
                  currentValueText={``}
                  valueTextFontSize={'2px'}
                  valueTextFontWeight={'0'}
                  paddingHorizontal={27}
                  paddingVertical={5}
                  needleTransitionDuration={1000}
                  segmentColors={['#03DF04', '#03DF04', '#A0F9A0', '#A0F9A0', '#FFFFFE', '#FFFFFE', '#A0F9A0', '#A0F9A0', '#03DF04', '#03DF04']}
                />
                  <IonItem className="value-text">

                    <IonLabel className="ion-text-center"><IonIcon src='/assets/ust.svg'></IonIcon>UST:</IonLabel>
                  </IonItem>
                  <IonItem className="value-text">
                    <IonLabel className="ion-text-center">$ {currentUSTPrice}</IonLabel>
                  </IonItem>
                  {/*-- This is another Buttons and Label Grid. Inside the first one, the intention here is to be able to have columns which are perfectly split from teh speedometer but still all centered --*/}
                  {/* TODO: Refactor in component */}
                  <ButtonGrid></ButtonGrid>

                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>



        {/* <ExploreContainer name="Tab 1 page" /> */}

      </IonContent>
    </IonPage>
  )
}

export default Tab1
