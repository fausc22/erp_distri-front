import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Modal from 'react-modal';

import {
  LoginContainerStyled, LoginWrapper, RightContainer,
  TableContainer, ConfirmButton, DeletedButton, ModalContainer, ModalContent, ModalButton, FormGroup, StyledButton, ClientInfo, Input, TableContainerModal
} from "./HistorialRemitoStyles";

const Historial = () => {
  const navigate = useNavigate();
  const [remitos, setRemitos] = useState([]); // Estado para almacenar los remitos
  const [selectedRemito, setSelectedRemito] = useState(null); // Estado para almacenar el remito seleccionado en la tabla
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [remitoProductos, setRemitoProductos] = useState([]); // Estado para almacenar los productos del pedido

  useEffect(() => {
    axios
      .get("http://localhost:3001/productos/obtener-remitos")
      .then((response) => {
        setRemitos(response.data); // Guardar remitos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener remitos:", error);
        toast.error("No se pudieron cargar los remitos");
      });
  }, []);



  const handleRowDoubleClick = async (remito) => {
    setSelectedRemito(remito);
    setModalIsOpen(true);

    try {
        const response = await axios.get(`http://localhost:3001/productos/obtener-productos-remito/${remito.id}`);
        setRemitoProductos(response.data); 
    } catch (error) {
        console.error("Error al obtener productos del pedido:", error);
        toast.error("No se pudieron cargar los productos del pedido");
    }

  };

  const generarPdf = async () => {
    if (!selectedRemito || remitoProductos.length === 0) {
        toast.error("Seleccione un cliente y al menos un producto");
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:3001/productos/generarpdf-remito",
            {
                remito: selectedRemito,
                productos: remitoProductos,
            },
            { responseType: "blob" } // Importante para recibir el PDF correctamente
        );

        // Crear un link para descargar el PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `REMITO_${selectedRemito.cliente_nombre}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        toast.error("Error al generar el PDF");
    }
};







  return (
    <LoginContainerStyled>
      <LoginWrapper>
        <RightContainer>
          <h2 style={{ textAlign: "center" }}>REMITOS</h2>

          <TableContainer>
            <DataTable
              value={remitos} // Usar el estado como fuente de datos
              showGridlines
              paginator
              rows={5}
              tableStyle={{ minWidth: "50rem" }}
              emptyMessage="No hay remitos disponibles"
              onRowDoubleClick={(e) => handleRowDoubleClick(e.data)}
            >
              <Column field="id" header="Cod."></Column>
              <Column field="fecha" header="FECHA"></Column>
              <Column field="cliente_nombre" header="NOMBRE"></Column>
              <Column field="cliente_condicion" header="CONDICIÓN"></Column>
              <Column field="cliente_cuit" header="CUIT"></Column>
              <Column field="cliente_telefono" header="TELÉFONO"></Column>
              <Column field="cliente_direccion" header="DIRECCIÓN"></Column>
              <Column field="cliente_ciudad" header="CIUDAD" sortable></Column>
              <Column field="cliente_provincia" header="PROVINCIA" sortable></Column>
              <Column field="estado" header="ESTADO"></Column>
              <Column field="observaciones" header="OBSERVACIONES"></Column>
            </DataTable>
          </TableContainer>

          
        </RightContainer>


             {/* MODAL DE DETALLE DE PEDIDO */}
                        {selectedRemito && (
                            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                                <ModalContainer>
                                    <h2><strong>Detalles del Pedido</strong></h2>
                                    <h4 style={{marginTop: '15px'}}><strong>Fecha:</strong> {selectedRemito.fecha}</h4>
                                    <br/>
            
            
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', marginTop: '20px' }}>
                        
                                        {/* Información del Cliente (Izquierda) */}
                                        <div style={{ width: '48%', textAlign: 'left' }}>
                                            
                                            <p><strong>Cliente:</strong> {selectedRemito.cliente_nombre}</p>
                                            <p><strong>Dirección:</strong> {selectedRemito.cliente_direccion}</p>
                                            <p><strong>Ciudad:</strong> {selectedRemito.cliente_ciudad}</p>
                                            <p><strong>Provincia:</strong> {selectedRemito.cliente_provincia}</p>
                                            <p><strong>Condición IVA:</strong> {selectedRemito.cliente_condicion}</p>
                                            <p><strong>CUIT:</strong> {selectedRemito.cliente_cuit}</p>
                                        </div>
            
                                        {/* Información del Documento y Totales (Derecha) */}
                                        <div style={{ width: '48%', textAlign: 'left'  }}>
                                            
                                            <p><strong>ESTADO:</strong> {selectedRemito.estado}</p>
                                            <p><strong>OBSERVACIONES</strong> {selectedRemito.observaciones}</p>
                                            
                                        </div>
            
                                    </div>
            
            
            
            
            
            
            
            
                                    
                                    
            
                                    {/* Contenedor para el título y el botón */}
                                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '10px' }}>
            
                                        {/* Título "Productos" centrado */}
                                        <h2 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', margin: 0 }}>
                                            <strong>Productos</strong>
                                        </h2>
            
                                        
            
                                    </div>
                                    <TableContainerModal>
                                        <DataTable value={remitoProductos} showGridlines tableStyle={{ minWidth: '50rem' }} >
                                            <Column field ="id" header="ID" hidden ></Column>
                                            <Column field="producto_id" header="Código"></Column>
                                            <Column field="producto_nombre" header="Nombre" sortable></Column>
                                            <Column field="producto_um" header="Unidad Medida"></Column>
                                            <Column field="cantidad" header="Cantidad" sortable></Column>
                                            
                                            
                                        </DataTable>
                                    </TableContainerModal>
            
                                    <div style={{ display: 'flex',  marginTop: '20px' }}>
                                        
                                        <ModalButton pdf style={{marginLeft: '250px'}} onClick={generarPdf} >IMPRIMIR REMITO</ModalButton>
                                        <ModalButton pdf style={{marginLeft: '15px', backgroundColor: 'lightblue', color: 'black'}}>VER DETALLE VENTA</ModalButton>
                                    </div>
                                </ModalContainer>
                            </Modal>
                        )}



      </LoginWrapper>
      <Toaster />
    </LoginContainerStyled>
  );
};

export default Historial;
