import { useState, useRef } from 'react'
import { FoodsMetadata } from '../../../../../../shared/FoodsSchema.js'
import FoodDetailsColumn from '../components/FoodDetails/FoodDetailsColumn.jsx'
import api from '../../../../../../global/helpers/api.js'
import toast from 'react-hot-toast'

export default function AddFood() {
  const [previewOrForm, setPreviewOrForm] = useState('form')
  //create the form object out of Food schema or the metadata about food
  const form = useRef({})

  function ModalForm() {
    const [formData, setFormData] = useState(() => {
      if (
        Object.keys(form.current).length <
        Object.keys(FoodsMetadata).length
      ) {
        return Object.fromEntries(
          Object.keys(FoodsMetadata).map((key) => {

            if(key === "name"){
              return [key, '']
            }

            return [key, 0]
          }),
        )
      }
      return form.current
    })

    function handleChange(e, name) {
      setFormData((p) => ({ ...p, [name]: e.value }))
      form.current = { ...formData, [name]: e.value }
    }

    return (
      <form
        className="shadow-form shadow-blue-primary rounded-2xl py-6 p-7 md:px-16
        flex flex-col gap-4 ">
        {Object.entries(FoodsMetadata).map(([name, metadata]) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={metadata.label}>{metadata.label}</label>
            <input
              className="px-3 py-2 border-3 rounded-xl border-blue-primary"
              id={metadata.label}
              placeholder={name}
              type={metadata.type}
              value={formData[name]}
              onChange={(e) => handleChange(e.target, name)}
              required={metadata.required}
            />
          </div>
        ))}
      </form>
    )
  }

  function Preview() {
    if (Object.keys(form.current).length === 0) {
      return (
        <p className="text-4xl text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
          Form not edited
        </p>
      )
    }

    async function saveFood(food) {      
      console.log(food);
      
      await toast.promise(api("food", {method: "POST", body: { food: food }}).catch((err) => {
        console.log(err)
        throw err
      }), {
        success: "Food created",
        loading: "Creating new food",
        error: "Food with same name already exists"
      }) 

    }

    return (
      <div>
        <div>
          {/* Preview of everything that was given in the form */}
          <FoodDetailsColumn food={form.current} />
        </div>
        <button
          className="btn mt-2"
          onClick={() => {            
            saveFood(form.current);
          }}>
          Submit
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-3 my-4">
        <button
          className={`btn ${
            previewOrForm === 'form' ? 'btn-active' : ''
          }`}
          onClick={() => {
            setPreviewOrForm('form')
          }}>
          Form
        </button>
        <button
          className={`btn ${
            previewOrForm === 'preview' ? 'btn-active' : ''
          }`}
          onClick={() => {
            setPreviewOrForm('preview')
          }}>
          Preview
        </button>
      </div>
      {previewOrForm === 'form' ? <ModalForm /> : <Preview />}
    </div>
  )
}
