<template>
  <div class="all">
    <div class="container">
      <div class="input-container">
        <label for="amount" class="font-bold block mb-2">número de desplazamiento</label>
        <div class="input-number">
          <button class="decrement-button" @click="decrement">
            <i :class="'pi pi-minus'"></i>
          </button>
          <input class="desplazamiento" v-model="value" id="amount" type="text" readonly />
          <button class="increment-button" @click="increment">
            <i :class="'pi pi-plus'"></i>
          </button>
        </div>
      </div>
      <div class="container-forms">
        <form @submit.prevent="onSubmit" id="exer17">
          <div class="form-item">
            <label for="txt">Texto: a cifrar</label>
            <input type="text" placeholder="Ingrese el texto" v-model="inputTextCifrar" id="txt" />
            <span class="err" v-if="inputTextCifrar.length === 0">campo vacío</span>
          </div>
          <div class="form-item">
            <input class="button" type="submit" value="Cifrar" />
          </div>
          <label class="r">Texto cifrado:</label>
          <span id="exe17response2" class="text-res" v-if="inputTextCifrar.length > 0">
            {{ cifradoOutput }}
            <i :class="[copied ? 'pi pi-check' : 'pi pi-copy']" @click="copiarTextoCifrado"
              style="cursor: pointer; margin-right: 10px;" @mouseenter="showTooltip = true"
              @mouseleave="showTooltip = false"></i>
            <span v-if="showTooltip" class="tooltip">{{ copied ? 'Copied!' : 'Copy' }}</span>
          </span>
          <span v-else class="err">Texto cifrado vacío</span>
        </form>
        <form @submit.prevent="onDecifrar" id="exer17">
          <div class="form-item">
            <label for="txt">Texto: a decifrar</label>
            <input type="text" placeholder="Ingrese el texto" v-model="inputTextDecifrar" id="txt" />
            <span class="err" v-if="inputTextDecifrar.length === 0">campo vacío</span>
          </div>
          <div class="form-item">
            <input class="button" type="submit" value="decifrar" />
          </div>
          <label class="r">Texto decifrado:</label>
          <span id="exe17response2" v-if="inputTextDecifrar.length > 0">{{ decifradoOutput }}
            <i :class="[copiedDecifrado ? 'pi pi-check' : 'pi pi-copy']" @click="copiarTextoDecifrado"
              style="cursor: pointer; margin-right: 10px;" @mouseenter="showTooltipD = true"
              @mouseleave="showTooltipD = false"></i>
            <span v-if="showTooltipD" class="tooltip">{{ copiedDecifrado ? 'Copied!' : 'Copy' }}</span>
          </span>
          <span v-else class="err">Texto decifrado vacío</span>
        </form>
      </div>
      <span @click="clearInputs" class="clearAll">
        <i :class="'pi pi-eraser'" style="cursor: pointer; margin-right: 10px;"
          @mouseenter="showTooltipEraser = true" @mouseleave="showTooltipEraser = false"></i> Limpiar todo
        <span v-if="showTooltipEraser" class="tooltip">Limpiar Campos</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import 'primeicons/primeicons.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faCheckCircle } from '@fortawesome/free-regular-svg-icons';

library.add(faCopy, faCheckCircle);

export default defineComponent({
  setup() {
    const copied = ref(false);
    const copiedDecifrado = ref(false);
    const showTooltip = ref(false);
    const showTooltipD = ref(false);
    const showTooltipEraser = ref(false);
    const value = ref(5);
    const inputTextCifrar = ref('');
    const inputTextDecifrar = ref('');
    const cifradoOutput = ref('');
    const decifradoOutput = ref('');
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';

    const increment = () => {
      value.value += 1;
    };

    const decrement = () => {
      if (value.value > 0) {
        value.value -= 1;
      }
    };

    const clearInputs = () => {
      inputTextCifrar.value = '';
      inputTextDecifrar.value = '';
      cifradoOutput.value = '';
      decifradoOutput.value = '';
    };

    const copiarTextoCifrado = () => {
      const textToCopy = cifradoOutput.value;
      navigator.clipboard.writeText(textToCopy).then(() => {
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar texto: ', err);
      });
    };

    const copiarTextoDecifrado = () => {
      const textToCopy = decifradoOutput.value;
      navigator.clipboard.writeText(textToCopy).then(() => {
        copiedDecifrado.value = true;
        setTimeout(() => {
          copiedDecifrado.value = false;
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar texto: ', err);
      });
    };

    const onSubmit = () => {
      cifradoOutput.value = cifradoCesar(inputTextCifrar.value, alfabeto, value.value);
    };

    const onDecifrar = () => {
      decifradoOutput.value = decifradoCesar(inputTextDecifrar.value, alfabeto, -value.value);
    };

    const cifradoCesar = (txt: string, alfabeto: string, movimientos: number): string => {
      let cifrado = '';
      for (let i = 0; i < txt.length; i++) {
        const cr = txt.charAt(i);
        const index = alfabeto.indexOf(cr) !== -1 ? alfabeto.indexOf(cr) : alfabeto.toUpperCase().indexOf(cr);
        const aux = index !== -1 ? (alfabeto.indexOf(cr) !== -1 ? alfabeto : alfabeto.toUpperCase()) : null;

        const caracterCifrado = aux ? nextPost(aux, index, movimientos) : cr;
        cifrado += caracterCifrado;
      }
      return cifrado;
    };

    const decifradoCesar = (txt: string, alfabeto: string, movimientos: number): string => {
      let decifrado = '';
      for (let i = 0; i < txt.length; i++) {
        const cr = txt.charAt(i);
        const index = alfabeto.indexOf(cr) !== -1 ? alfabeto.indexOf(cr) : alfabeto.toUpperCase().indexOf(cr);
        const aux = index !== -1 ? (alfabeto.indexOf(cr) !== -1 ? alfabeto : alfabeto.toUpperCase()) : null;

        const caracterDescifrado = aux ? prevPost(aux, index, movimientos) : cr;
        decifrado += caracterDescifrado;
      }
      return decifrado;
    };

    const nextPost = (abc: string, index: number, movimientos: number): string => {
      index += movimientos;
      if (index >= abc.length) {
        index -= abc.length;
      }
      return abc.charAt(index);
    };

    const prevPost = (abc: string, index: number, movimientos: number): string => {
      index += movimientos;
      if (index >= abc.length) {
        index -= abc.length;
      }
      if (index < 0) {
        index = abc.length + (index % abc.length);
      }
      return abc.charAt(index);
    };

    return {
      value,
      inputTextCifrar,
      inputTextDecifrar,
      cifradoOutput,
      decifradoOutput,
      copied,
      copiedDecifrado,
      showTooltip,
      showTooltipD,
      showTooltipEraser,
      increment,
      decrement,
      clearInputs,
      copiarTextoCifrado,
      copiarTextoDecifrado,
      onSubmit,
      onDecifrar,
    };
  },
});
</script>
<style scoped>
.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8em;
  transform: translateX(-100%);
  /* Para que el tooltip aparezca a la izquierda */
  margin-right: 10px;
}

.container {
  padding: 20px;
  width: 100%;

}

.clearAll {
  width: 70%;
  background-color: #ecfef9;
  border: #9dffe0 solid 1px;
  color: #707070;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;


  &:hover {
    color: #008c5f;
  }
}

.pi-check {
  /* padding: 5px; */
  color: blue;
  /* border: 1px solid blue; */
}

#exe17response2,
#exe17txtNormal {
  background-color: #F6FFF3FF;
  color: #1C1C1CFF;
  border: 1px solid #B1FFB0FF;

  padding: 10px;
  font-size: 1.2em;
  font-weight: bold;
  /* border: dashed; */
  display: flex;
  justify-content: space-between;
}

/* Responsive */
@media screen and (max-width: 600px) {
  #exe17response2 font-awesome-icon {
    font-size: 1em;
    /* Ajusta el tamaño del ícono en pantallas pequeñas */
  }
}

.container {
  width: 100%;
  /* Fijar el ancho */
  height: auto;
  /* gap: 10px; */
  /* Fijar la altura */
  /* border: 1px solid #dcdcdc; */
  /* box-shadow: 0px 5px 16px 5px rgb(217, 217, 217); */
  /* background-color: #ffffff; */
  margin: 0 auto;
  /* Centra horizontalmente */
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* Centra verticalmente el contenido */
  /* align-items: self-start; */
  /* Centra horizontalmente el contenido */
  /* border: dashed; */
  /* padding: 10px; */
  .container-forms{
  gap: 20px;
  display: flex;
flex-direction: row;
margin: 10px;
flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* border: dashed; */
  form {
    width: 80%;
    
    border-radius: 5px;
    background-color: #ffffff;
    border: 1px solid rgb(255, 254, 240);
    /* border-radius: 10px; */
    box-shadow: 0px 5px 16px 5px #cacaca4b;
  }
  }
}

.r {
  border-radius: 3px;
  padding: 4px;
  color: #008c5f;
  background-color: #dbffd0;
}

.ver-mas {
  margin: 0 auto;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  /* Padding para pantallas grandes */
  box-shadow: 0px 4px 5px 4px rgb(239, 239, 239);
  background: linear-gradient(0deg, #FFF7D3FF 0%, #FFFFFFFF 100%);
  margin-bottom: 10px;
  transform: scale(1);
  /* Escala normal en pantallas grandes */
}

a {
  cursor: pointer;
  color: #9c31d9;
}

.all {
  font-size: large;
  font-family: Arial, Helvetica, sans-serif;
  /* max-width: 1200px; */
  /* padding: 14px; */
  width: 100%;
  
  /* Ocupar todo el ancho */
  height: auto;
  /* margin: 0; */
  /* Ocupar toda la altura del contenedor padre */
  box-sizing: border-box;
  /* Incluir padding y border dentro de las dimensiones */

  /* padding: 20px; */
}

h2 {
  text-align: center;
  font-size: 2em;
  color: #008c5f;
}

p {
  font-size: 1.2em;
  line-height: 1.6;
  text-align: justify;
}

.err {
  font-size: 12px;
  /* line-height: 1.6; */
  color: red;
  text-align: justify;
}




form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
}

.form-item label {
  display: flex;

  align-items: start;
  margin-bottom: 5px;


  font-size: 1.2em;
}

input[type="text"] {
  padding: 10px;
  font-size: 1.1em;
  background-color: #F0F0F0FF;
  /* container: 'Ingrese el texto'; */
  border: 1px solid #e7e7e7;
  border-radius: 2px;
  outline: none;
  color: #008c5f;
  height: 25px;
}

input[type="text"]:focus {
  border: 1px solid rgb(176, 255, 226);

}

.button {
  height: 40px;
  font-size: 1.2em;
  color: #9c31d9;
  background-color: white;
  border: none;
  border: 1px solid #f6e5ff;
  border-radius: 2px;
  cursor: pointer;
}

.button:hover {
  /* color: white; */

  background-color: #f6e5ff;
}

#exe17response {
  margin-top: 20px;
}

#exe17response2,
#exe17txtNormal {
  font-size: 1.2em;
  font-weight: bold;
}

/* Responsive design for mobile devices */
@media screen and (max-width: 768px) {

  h2 {
    font-size: 1.5em;
  }

  p {
    font-size: 12px;
  }

  input[type="text"] {
    font-size: 1em;
  }

  .button {
    font-size: 1em;
    padding: 8px 16px;
  }

  #exe17response2,
  #exe17txtNormal {
    font-size: 1em;
  }
}

/* For smaller devices like phones */
@media screen and (max-width: 600px) {
  h2 {
    font-size: 1.2em;
  }

  .all {
    margin-top: 0;

  }

  input[type="text"] {
    font-size: 0.9em;
    padding: 8px;
  }

  input[type="text"]:focus {
    border-color: green;
    /* cambia el color del borde a verde cuando el input está seleccionado */
  }

  .button {
    font-size: 0.9em;
    padding: 6px 12px;
  }

  .container {
    width: 90%;

    .container-forms{
      display: flex;
      width: 80%;
      flex-direction: column;
       
    }
    /* Fijar el ancho */
    /* flex-direction: column; */

  }

  .ver-mas {
    padding: 10px;
    /* Reducimos más el padding para pantallas pequeñas */
    transform: scale(0.9);
    /* Escalamos ligeramente para que se vea mejor en pantallas pequeñas */
  }

  .img-container {
    padding: 10px;

    /* Ajustamos el padding de la imagen */
    img {
      width: 100%;
    }
  }

  #exe17response2,
  #exe17txtNormal {
    font-size: 0.9em;
  }
}



/*  */
.input-container {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.input-number {
  background-color: #f6e0ff;
  display: flex;
  align-items: center;
  border: 1px solid #e3d3e6;
  border-radius: 5px;
  overflow: hidden;
}

input.desplazamiento {
  border: none;
  text-align: center;
  width: 100%;
  padding: 8px;
  font-size: 1.2em;
}

button {
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.decrement-button,
.increment-button {

  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.decrement-button i,
.increment-button i {
  font-size: 1.2em;
  color: #9000ff;
  &:focus{
  color: red;
  }
}



button:focus {
  outline: none;
}
</style>