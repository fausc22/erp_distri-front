import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Modal from 'react-modal';
import { MdSearch, MdDeleteForever } from "react-icons/md";

import {
    LoginContainerStyled, LoginWrapper, RightContainer,
    TableContainer, ConfirmButton, DeletedButton, ModalContainer, ModalContent, ModalButton, FormGroup, StyledButton, ClientInfo, Input,
} from './HistorialStyles';

const Historial = () => {
    const navigate = useNavigate();
    const [ventas, setVentas] = useState([]); // Estado para almacenar las ventas
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [productos, setProductos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productDialogVisible, setProductDialogVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [productQuantity, setProductQuantity] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);  // Nuevo modal de confirmación
    const [productToDelete, setProductToDelete] = useState(null);  // Producto a eliminar

    // Obtener datos de ventas al montar el componente
    useEffect(() => {
        axios.get('http://localhost:3001/ventas/obtener-ventas')
            .then((response) => {
                setVentas(response.data); // Guardar ventas en el estado
            })
            .catch((error) => {
                console.error("Error al obtener ventas:", error);
                toast.error("No se pudieron cargar los comprobantes");
            });
    }, []);

    // Obtener productos de un pedido cuando se selecciona una venta
    const handleRowDoubleClick = async (venta) => {
        setSelectedVenta(venta);
        setModalIsOpen(true);

        try {
            const response = await axios.get(`http://localhost:3001/ventas/obtener-productos-venta/${venta.id}`);
            setProductos(response.data); 
        } catch (error) {
            console.error("Error al obtener productos del pedido:", error);
            toast.error("No se pudieron cargar los productos del pedido");
        }
    };

    // Función para modificar la cantidad o precio de un producto
    const handleProductoChange = (index, field, value) => {
        const updatedProductos = [...productos];
        updatedProductos[index][field] = value;
        updatedProductos[index].subtotal = (updatedProductos[index].cantidad * updatedProductos[index].precio).toFixed(2);
        setProductos(updatedProductos);
    };

    // Función para agregar un nuevo producto
    const handleAgregarProducto = () => {
        setProductos([...productos, { id: null, nombre: '', cantidad: 1, precio: 0, subtotal: 0 }]);
    };

    // Función para eliminar un producto del pedido
    const handleEliminarProducto = (index) => {
        setProductos(productos.filter((_, i) => i !== index));
    };

    // Función para confirmar el pedido
    const handleConfirmarPedido = async () => {
        try {
            await axios.put(`http://localhost:3001/ventas/modificar-estado-venta/${selectedVenta.id}`, { estado: 'CONFIRMADA' });
            toast.success("Pedido confirmado");
            setModalIsOpen(false);
        } catch (error) {
            console.error("Error al confirmar pedido:", error);
            toast.error("Error al confirmar pedido");
        }


        const ventaData = {
            venta_id: selectedVenta.id,
            cliente_id: selectedVenta.cliente_id,
            cliente_nombre: selectedVenta.cliente_nombre,
            cliente_condicion: selectedVenta.cliente_condicion,
            cliente_cuit: selectedVenta.cliente_cuit,
            cliente_telefono: selectedVenta.cliente_telefono,
            cliente_direccion: selectedVenta.cliente_direccion,
            cliente_ciudad: selectedVenta.cliente_ciudad,
            cliente_provincia: selectedVenta.cliente_provincia,
            estado: 'Pendiente',
            observaciones: '-',
            productos: productos.map(p => ({
                producto_id: p.producto_id,
                producto_nombre: p.producto_nombre,
                producto_um: p.producto_um,
                cantidad: p.cantidad,
                
            })),
        };
    
        console.log("Datos de la venta antes de enviarse:", ventaData);
    
        try {
            const response = await axios.post('http://localhost:3001/productos/nuevo-remito', ventaData);
            toast.success('Venta registrada con éxito');
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            toast.error('Error al registrar la venta');
        }



    };

    // Función para anular el pedido
    const handleAnularPedido = async () => {
        try {
            await axios.put(`http://localhost:3001/ventas//modificar-estado-venta/${selectedVenta.id}`, { estado: 'ANULADA' });
            toast.success("Pedido anulado");
            setModalIsOpen(false);
            setVentas(ventas.filter(v => v.id !== selectedVenta.id));
        } catch (error) {
            console.error("Error al anular pedido:", error);
            toast.error("Error al anular pedido");
        }
    };

    const onProductDoubleClick = (event) => {
        setSelectedProduct(event.data); // Se extrae correctamente el producto de event.data
        setProductDialogVisible(true);
    };


    // Función para abrir el modal
    const handleOpenProductModal = () => {
        setModalIsOpen(false);  // Cierra el modal de detalle
        setTimeout(() => setProductModalOpen(true), 300); 
    };

    // Función para cerrar el modal
    const handleCloseProductModal = () => {
        setProductModalOpen(false);
    };

    const handleSearchProduct = async () => {
        
        if (!searchProduct.trim()) {
            toast.error('Ingrese un producto para buscar');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/ventas/filtrar-producto?q=${searchProduct}`);
            setProducts(response.data);
            setProductModalOpen(true);
        } catch (error) {
            console.error('Error al buscar productos:', error);
            toast.error('Error al buscar productos');
        }
    };

    const handleProductSelection = (product) => {
        setSelectedProduct(product);
    };


    const handleAddProduct = async () => {
        if (!selectedProduct || productQuantity < 1) {
            toast.error('Debe seleccionar un producto y una cantidad válida');
            return;
        }
    
        const precio = parseFloat(selectedProduct.precio);
        const iva = parseFloat((precio * 0.21).toFixed(2));
        const subtotal = parseFloat((precio * productQuantity).toFixed(2));
    
        const newProduct = {
            producto_id: selectedProduct.id,
            producto_nombre: selectedProduct.nombre,
            producto_um: selectedProduct.unidad_medida,
            cantidad: productQuantity,
            precio,
            iva,
            subtotal
        };
    
        try {
            const response = await axios.post(`http://localhost:3001/ventas/agregar-producto/${selectedVenta.id}`, newProduct);
            if (response.data.success) {
                toast.success(`Producto agregado: ${newProduct.cantidad} x ${newProduct.producto_nombre}`);
                

                 // 🔄 Recargar productos y actualizar el total
                await handleRowDoubleClick(selectedVenta);
                await actualizarTotalPedido(selectedVenta.id);


                // 🔴 Cerrar modal de productos primero
                setProductModalOpen(false);
                // ⏳ Esperar un pequeño tiempo antes de reabrir el modal de detalle
                setTimeout(() => {
                    setModalIsOpen(true);
                }, 300);  // Pequeño delay para evitar superposiciones de modales
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error al agregar el producto al pedido:', error);
            toast.error('No se pudo agregar el producto.');
        }
    
        // 🔵 Limpiar estados para la próxima selección
        setSelectedProduct(null);
        setProductQuantity(1);
        setProducts([]);
        setSearchProduct('');
    };

    const handleOpenDeleteModal = (product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
        setModalIsOpen(false);
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;
    
        try {
            const response = await axios.delete(`http://localhost:3001/ventas/eliminar-producto-venta/${productToDelete.id}`);
            
            if (response.data.success) {
                toast.success(`Producto eliminado: ${productToDelete.producto_nombre}`);
                
                // 🔄 Recargar productos y actualizar el total
                await handleRowDoubleClick(selectedVenta);
                await actualizarTotalPedido(selectedVenta.id);
    
                // 🔴 Cerrar el modal de eliminación
                setDeleteModalOpen(false);
                setProductToDelete(null);
                setTimeout(() => {
                    setModalIsOpen(true);
                }, 300);  // Pequeño delay para evitar superposiciones de modales
                
            } else {
                toast.error('No se pudo eliminar el producto.');
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            toast.error('Error al eliminar el producto.');
        }
    };


    const handleUpdateProduct = async () => {
        if (!selectedProduct) return;
    
        // Validar que los valores sean correctos
        const updatedProduct = {
            cantidad: selectedProduct.cantidad || 1,
            precio: selectedProduct.precio || 0,
            iva: (selectedProduct.precio * 0.21).toFixed(2),
            subtotal: (selectedProduct.cantidad * selectedProduct.precio).toFixed(2)
        };
    
        try {
            const response = await axios.put(
                `http://localhost:3001/ventas/actualizar-producto-venta/${selectedProduct.id}`,
                updatedProduct
            );
    
            if (response.data.success) {
                toast.success(`Producto actualizado: ${selectedProduct.producto_nombre}`);
    
                // 🔄 Recargar productos y actualizar total
                await handleRowDoubleClick(selectedVenta);
                await actualizarTotalPedido(selectedVenta.id);
    
                setProductDialogVisible(false);
                setTimeout(() => {
                    setModalIsOpen(true);
                }, 300);
            } else {
                toast.error('No se pudo actualizar el producto.');
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            toast.error('Error al actualizar el producto.');
        }
    };
    

    const handleCancelar = () => {
        setDeleteModalOpen(false);
        setModalIsOpen(true);
    }



    const actualizarTotalPedido = async (ventaId) => {
        const nuevoTotal = productos
            .reduce((acc, prod) => acc + parseFloat(prod.subtotal || 0), 0)
            .toFixed(2); // ✅ Asegurar formato decimal
    
        try {
            const response = await axios.put(`http://localhost:3001/ventas/actualizar-venta/${ventaId}`, { total: parseFloat(nuevoTotal) });
    
            if (response.data.success) {
                toast.success("Total actualizado correctamente");
                setSelectedVenta(prev => ({ ...prev, total: nuevoTotal })); // Actualizar la UI
            }
        } catch (error) {
            console.error("Error al actualizar el total del pedido:", error);
            toast.error("No se pudo actualizar el total del pedido");
        }
    };


    const handleCantidadChange = (e) => {
        const nuevaCantidad = parseInt(e.target.value) || 1;
        
        setSelectedProduct((prev) => ({
            ...prev,
            cantidad: nuevaCantidad,
            subtotal: (nuevaCantidad * prev.precio).toFixed(2) // Recalcular subtotal
        }));
    };

    const generarPDF = async () => {
        if (!selectedVenta || productos.length === 0) {
            toast.error("Seleccione un cliente y al menos un producto");
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:3001/ventas/generarpdf-factura",
                {
                    venta: selectedVenta,
                    productos: productos,
                },
                { responseType: "blob" } // Importante para recibir el PDF correctamente
            );
    
            // Crear un link para descargar el PDF
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `FACTURA - ${selectedVenta.cliente_nombre}.pdf`;
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
                    <h2 style={{ textAlign: 'center' }}>COMPROBANTES DE VENTA</h2>

                    <TableContainer>
                        <DataTable 
                            value={ventas} 
                            showGridlines 
                            paginator 
                            rows={5} 
                            tableStyle={{ minWidth: '50rem' }} 
                            emptyMessage="No hay comprobantes disponibles"
                            onRowDoubleClick={(e) => handleRowDoubleClick(e.data)}
                        >
                            <Column field="id" header="Código"></Column>
                            <Column field="fecha" header="FECHA" sortable style={{ width: '25%' }}></Column>
                            <Column field="cliente_nombre" header="Nombre" sortable style={{ width: '25%' }}></Column>
                            <Column field="tipo_documento" header="Tipo Doc" sortable ></Column>
                            <Column field="tipo_fiscal" header="TIPO"></Column>
                            <Column field="total" header="TOTAL ($)"></Column>
                            <Column field="estado" header="Estado" sortable></Column>
                            <Column 
                            
                                header="CAE" 
                                body={(rowData) => (
                                    <button 
                                        style={{
                                            backgroundColor: rowData.cae_id ? 'green' : 'red', 
                                            color: 'white', 
                                            border: 'none', 
                                            padding: '5px', 
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {rowData.cae_id ? '✔' : '✖'}
                                    </button>
                                )}
                                style={{ textAlign: 'center', width: '5%' }}
                            />

                        </DataTable>
                    </TableContainer>
                    
                    
                </RightContainer>
            </LoginWrapper>



            {/* MODAL DE DETALLE DE PEDIDO */}
            {selectedVenta && (
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <ModalContainer>
                        <h2><strong>Detalles del Pedido</strong></h2>
                        <h4 style={{marginTop: '15px'}}><strong>Fecha:</strong> {selectedVenta.fecha}</h4>
                        <br/>


                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', marginTop: '20px' }}>
            
                            {/* Información del Cliente (Izquierda) */}
                            <div style={{ width: '48%', textAlign: 'left' }}>
                                
                                <p><strong>Cliente:</strong> {selectedVenta.cliente_nombre}</p>
                                <p><strong>Dirección:</strong> {selectedVenta.cliente_direccion}</p>
                                <p><strong>Ciudad:</strong> {selectedVenta.cliente_ciudad}</p>
                                <p><strong>Provincia:</strong> {selectedVenta.cliente_provincia}</p>
                                <p><strong>Condición IVA:</strong> {selectedVenta.cliente_condicion}</p>
                                <p><strong>CUIT:</strong> {selectedVenta.cliente_cuit}</p>
                            </div>

                            {/* Información del Documento y Totales (Derecha) */}
                            <div style={{ width: '48%', textAlign: 'left'  }}>
                                <p><strong>DOCUMENTO:</strong> {selectedVenta.tipo_documento}</p>
                                <p><strong>TIPO FISCAL:</strong> {selectedVenta.tipo_fiscal}</p>
                                <p><strong>Total:</strong> $ {selectedVenta.total}</p>
                                <p><strong>ESTADO:</strong> {selectedVenta.estado}</p>
                                <p><strong>CAE:</strong> {selectedVenta.cae_id ? '✔' : '✖'}</p>
                                <p><strong>FECHA CAE:</strong> {selectedVenta.cae_fecha}</p>
                            </div>

                        </div>








                        
                        

                        {/* Contenedor para el título y el botón */}
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '10px' }}>

                            {/* Título "Productos" centrado */}
                            <h2 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', margin: 0 }}>
                                <strong>Productos</strong>
                            </h2>

                            {/* Botón "AGREGAR PRODUCTOS" alineado a la derecha */}
                            <div style={{ marginLeft: 'auto' }}>
                                <ModalButton onClick={handleOpenProductModal} style={{ backgroundColor: 'green', color: 'white' }}>
                                    AGREGAR PRODUCTO
                                </ModalButton>
                            </div>

                        </div>
                        <TableContainer>
                            <DataTable value={productos} showGridlines tableStyle={{ minWidth: '50rem' }} onRowDoubleClick={onProductDoubleClick}>
                                <Column field ="id" header="ID" hidden ></Column>
                                <Column field="producto_id" header="Código"></Column>
                                <Column field="producto_nombre" header="Nombre"></Column>
                                <Column field="producto_um" header="Unidad Medida"></Column>
                                <Column field="cantidad" header="Cantidad"></Column>
                                <Column field="precio" header="Precio Unitario ($)"></Column>
                                <Column field="iva" header="IVA ($)"></Column>
                                <Column field="subtotal" header="Subtotal ($)"></Column>
                                <Column 
                            
                                header="" 
                                body={(rowData) => (
                                    <button 
                                        onClick={() => handleOpenDeleteModal(rowData)}
                                        style={{
                                            backgroundColor: 'red', 
                                            color: 'white', 
                                            border: 'none', 
                                            padding: '5px', 
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ✖
                                    </button>
                                )}
                                style={{ textAlign: 'center', width: '5%' }}
                            />
                            </DataTable>
                        </TableContainer>

                        <div style={{ display: 'flex',  marginTop: '20px' }}>
                            <ModalButton confirm onClick={handleConfirmarPedido} >Confirmar Pedido</ModalButton>
                            <ModalButton deleteButton onClick={handleAnularPedido} style={{background: 'red', marginLeft: '15px'}}>Anular Pedido</ModalButton>
                            <ModalButton pdf style={{marginLeft: '500px'}} onClick={generarPDF}>IMPRIMIR FACTURA</ModalButton>
                            <ModalButton pdf style={{marginLeft: '15px', backgroundColor: 'lightblue', color: 'black'}}>SOLICITAR CAE</ModalButton>
                        </div>
                    </ModalContainer>
                </Modal>
            )}

            {/* MODAL DE EDICIÓN DEL PRODUCTO - FUERA DEL MODAL DE DETALLE */}
            {selectedProduct && (
                        <Modal isOpen={productDialogVisible} onRequestClose={() => setProductDialogVisible(false)}>
                            <ModalContainer>
                                <h2 style={{ textAlign: 'center' }}>🛒 Editar Producto</h2>


                                <FormGroup>
                                    <label htmlFor="nombre" style={{textAlign: 'center' }}>NOMBRE</label>
                                    <div style={{ textAlign: 'center' }}>
                                        <Input id="nombre" 
                                        type="text" 
                                        style={{ minWidth: '400px', textAlign: 'center' }}
                                        value={selectedProduct.producto_nombre || ''} 
                                        disabled     
                                        />
                                                            
                                
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor="um" style={{textAlign: 'center' }}>UNIDAD MEDIDA</label>
                                    <div style={{ textAlign: 'center' }}>
                                        <Input id="um" 
                                        type="text" 
                                        style={{ width: '100px', textAlign: 'center' }}
                                        value={selectedProduct.producto_um || ''} 
                                        disabled     
                                        />
                                                            
                                
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor="precio" style={{textAlign: 'center' }}>PRECIO ($$)</label>
                                    <div style={{ textAlign: 'center' }}>
                                        <strong>$</strong> 
                                        <Input id="precio" 
                                        type="text" 
                                        style={{ width: '150px', textAlign: 'left' }}
                                        value={selectedProduct.precio || 0} 
                                        onChange={(e) => setSelectedProduct({ ...selectedProduct, precio: parseFloat(e.target.value) || 0 })} 
                                             
                                        />
                                                   
                                
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor="cantidad" style={{textAlign: 'center' }}>CANTIDAD</label>
                                    <div >
                                        <Input id="cantidad" 
                                        style={{ textAlign: 'center', width: '100px' }}
                                        type="number" 
                                        value={selectedProduct.cantidad || 1} 
                                        onChange={handleCantidadChange} 
                                        min="1"
                                        />
                                                            
                                
                                    </div>
                                </FormGroup>
                                

                                

                                <FormGroup>
                                    <label htmlFor="precio" style={{textAlign: 'center' }}>SUBTOTAL ($$)</label>
                                    <div style={{ textAlign: 'center' }}>
                                        <strong>$</strong> 
                                        <Input id="precio" 
                                        type="text" 
                                        style={{ width: '150px', textAlign: 'left' }}
                                        value={selectedProduct.subtotal || 0} 
                                        disable
                                             
                                        />
                                                   
                                
                                    </div>
                                </FormGroup>
                                

                                

                                <div className="p-field">
                                    <ModalButton onClick={handleUpdateProduct}>Editar</ModalButton>
                                    
                                    <ModalButton onClick={() => setProductDialogVisible(false)}>Cancelar</ModalButton>
                                </div>
                            </ModalContainer>
                        </Modal>
                    )}



                {/* MODAL AGREGAR PRODUCTOS */}
            <Modal isOpen={productModalOpen} onRequestClose={handleCloseProductModal}>
                <ModalContainer style={{ display: 'flex', gap: '20px' }}>
                    

                        <FormGroup>
                                                <label style={{textAlign: 'center' }}>Buscar Producto:</label>
                                                <div style={{ textAlign: 'center' }}>
                                                    <Input type="text" value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} placeholder="Buscar Producto" />
                                                    <StyledButton type="button" onClick={handleSearchProduct} style={{marginLeft: '10px'}}><MdSearch style={{color: 'green'}}/></StyledButton>
                                                </div>
                                            </FormGroup>                                              



                    {/* Columna izquierda: Lista de productos */}
                    <div style={{ width: '50%', overflowY: 'auto', maxHeight: '400px' }}>
                        <h3>Seleccionar Producto</h3>
                        {products.map((product, index) => (
                            <div 
                                key={index} 
                                onDoubleClick={() => handleProductSelection(product)} 
                                style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                                {product.nombre}
                            </div>
                        ))}
                    </div>

                    {/* Columna derecha: Detalles del producto seleccionado */}
                    {selectedProduct && (
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <ModalContent>
                                <h4>DATOS PRODUCTO</h4>
                                <ClientInfo><strong>Nombre:</strong> {selectedProduct.nombre}</ClientInfo>
                                <ClientInfo><strong>Unidad de Medida:</strong> {selectedProduct.unidad_medida}</ClientInfo>
                                <ClientInfo><strong>Precio:</strong> {selectedProduct.precio}</ClientInfo>
                                <ClientInfo><strong>Stock:</strong> {selectedProduct.stock_actual}</ClientInfo>

                                {/* Input numérico para la cantidad */}
                                <FormGroup>
                                    <label>Cantidad:</label>
                                    <Input 
                                        type="number" 
                                        value={productQuantity} 
                                        onChange={(e) => setProductQuantity(Math.max(1, Number(e.target.value)))} 
                                        min="1" 
                                        style={{ width: '100px' }} 
                                    />
                                </FormGroup>

                                <ClientInfo><strong>Subtotal:</strong> {(selectedProduct.precio * productQuantity).toFixed(2)}</ClientInfo>

                                {/* Botón de agregar producto */}
                                <ModalButton onClick={handleAddProduct}>Agregar Producto</ModalButton>
                            </ModalContent>
                        </div>
                    )}
                </ModalContainer>
            </Modal>



            {/* MODAL DE CONFIRMACIÓN PARA ELIMINAR PRODUCTO */}
            <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                <ModalContainer>
                    <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>⚠️ Confirmar Eliminación</h3>
                    
                    {productToDelete && (
                        <>
                            <p style={{ textAlign: 'center' }}>
                                ¿Estás seguro de que deseas eliminar <strong>{productToDelete.cantidad}</strong> unidades de <strong>{productToDelete.producto_nombre}</strong>?
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                                <ModalButton onClick={handleDeleteProduct} style={{ backgroundColor: 'red', color: 'white' }}>
                                    Sí, eliminar
                                </ModalButton>
                                <ModalButton onClick={handleCancelar} style={{ backgroundColor: 'gray', color: 'white' }}>
                                    No, cancelar
                                </ModalButton>
                            </div>
                        </>
                    )}
                </ModalContainer>
            </Modal>





            <Toaster />
        </LoginContainerStyled>
    );
};

export default Historial;
