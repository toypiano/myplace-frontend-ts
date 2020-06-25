import { useReducer, useCallback } from 'react'

type FormStateInputId = 'title' | 'description' | 'address'

type FormStateInputs = {
  [inputId in FormStateInputId]: {
    value: string
    isValid: boolean
  }
}

type FormState = {
  inputs: FormStateInputs
  isValid: boolean
}

type Action = {
  type: 'INPUT_CHANGE'
  inputId: string
  value: string
  isValid: boolean
}

const formReducer = (state: FormState, action: Action) => {
  // assertion signature only works with function declaration (no arrow func)
  // https://github.com/microsoft/TypeScript/issues/34523
  function validateInput(
    input: string
    // TS will ensure that input is the type of:
    // keyof (FormStateInputId) typeof(FormStateInputs) state.inputs
    // in any block guarded by a call to the validateInput
    // if this function returns at all (otherwise an error is thrown)
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions

    // MORE on advanced types:
    // https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates
  ): asserts input is keyof typeof state.inputs {
    // input type validation inspired by:
    // https://stackoverflow.com/a/56569217/13036807
    if (!(input in state.inputs)) throw Error('invalid inputId')
  }

  switch (action.type) {
    case 'INPUT_CHANGE':
      let isFormValid = true
      for (const input in state.inputs) {
        validateInput(input)
        if (input === action.inputId) {
          isFormValid = isFormValid && action.isValid
        } else {
          // Without type validation(validateInput), TS will error out
          // because 'input' is of the type 'string'
          // (TS cannot know what property state.inputs will have in runtime)
          // and you cannot index 'FormStateInputs' type with 'string'
          // because 'FormStateInputs' has the index type of 'FormStateInputId'
          isFormValid = isFormValid && state.inputs[input].isValid

          /*
          // Alternatively you can typecast input with type assertion 
          // (shorter, but less safe)
          isFormValid = isFormValid && state.inputs[input as FormStateInputId].isValid
          */
        }
      }
      // update formState.inputs with 'INPUT_CHANGE' payload
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: isFormValid,
      }
    default:
      return state
  }
}

export const useForm = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  })

  const inputChangeCallback = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        inputId: id,
        value,
        isValid,
      })
    },
    []
  )
  // const assertions - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
  // makes array literals readonly tuples. (diff. types in each position of the array)
  // Without it, TS will infer a union type:
  // (FormState | (id: string, value: string, isValid: boolean) => void)[]
  return [formState, inputChangeCallback] as const
}