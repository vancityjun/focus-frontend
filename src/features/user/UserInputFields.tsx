import React, { useState, useEffect } from 'react'
import TextInputWithTitle from '../../shared/TextInputWithTitle'
import SelectWithTitle from '../../shared/SelectWithTitle'
import LocationData from '../../graphql/queries/locationData.gql'
import { useQuery } from '@apollo/client'

interface UserInputFieldsTypes {
  errorMessage?: string
  state: any
  dispatch: ({}) => void
}

const genders = [
  { label: 'male', value: 'male' },
  { label: 'female', value: 'female' },
  { label: 'other', value: 'other' },
]

const UserInputFields = ({
  errorMessage,
  state,
  dispatch,
}: UserInputFieldsTypes) => {
  const [countries, setCountries] = useState([])
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])

  const {
    loading,
    error,
    data: { locationData } = {},
    refetch,
  } = useQuery(LocationData)

  useEffect(() => {
    if (!loading && locationData) {
      if (!state.country || !countries.length) {
        setCountries(locationData)
      } else if (!state.region || !regions.length) {
        setRegions(locationData)
      } else {
        setCities(locationData)
      }
    }
  }, [loading, locationData])

  const resetLocation = () => {
    setCities([])
    dispatch({ target: { city: '' } })
    dispatch({ target: { region: '' } })
  }

  useEffect(() => {
    if (countries.length) {
      resetLocation()
      refetch({ country: state.country, region: '' })
    }
  }, [state.country])

  useEffect(() => {
    countries.length && refetch({ country: state.country, region: '' })
  }, [countries])

  useEffect(() => {
    regions.length && refetch({ country: state.country, region: state.region })
  }, [state.region, regions])

  return (
    <>
      <TextInputWithTitle
        title="First name"
        onChangeText={(value: string) =>
          dispatch({ target: { firstName: value } })
        }
        value={state.firstName}
        textContentType="givenName"
      />
      <TextInputWithTitle
        title="Last name"
        onChangeText={(value: string) =>
          dispatch({ target: { lastName: value } })
        }
        value={state.lastName}
        errorMessage={errorMessage}
        textContentType="familyName"
      />
      <SelectWithTitle
        onValueChange={(value) =>
          value ? dispatch({ target: { gender: value } }) : null
        }
        title="Gender"
        items={genders}
        value={state.gender}
      />
      {/* consider change to search & dropdown later */}
      <SelectWithTitle
        onValueChange={(value) => dispatch({ target: { country: value } })}
        title="Country"
        items={countries}
        value={state.country}
        disabled={!countries.length}
      />
      <SelectWithTitle
        onValueChange={(value) => dispatch({ target: { region: value } })}
        title="Region"
        items={regions}
        value={state.region}
        disabled={!regions.length}
      />
      <SelectWithTitle
        onValueChange={(value) => dispatch({ target: { city: value } })}
        title="City"
        items={cities}
        value={state.city}
        disabled={!cities.length}
      />
    </>
  )
}

export default UserInputFields
