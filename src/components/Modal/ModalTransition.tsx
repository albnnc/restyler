// import React, { forwardRef, useEffect, useRef } from 'react';
// import {
//   StandaloneTransitionerProps,
//   useClickOutside,
//   useFocusTrap,
//   useSharedRef,
//   useStack,
//   useTransition
// } from '../../hooks';
// import { Layer } from '../Layer';
// import { Modal, ModalProps } from './Modal';

// export interface ModalTransitionerProps
//   extends StandaloneTransitionerProps<HTMLDivElement>,
//     ModalProps {}

// export const ModalTransition = forwardRef<
//   HTMLDivElement,
//   ModalTransitionerProps
// >(({ handleClose, isVisible, ...rest }, ref) => {
//   const transition = useTransition(() => )

//   const layerRef = useRef<HTMLDivElement>(null);
//   const [isLayerMounted, layerTransitionProps] = useTransition<HTMLDivElement>(
//     layerRef,
//     isOpen
//   );

//   const wasMountedRef = useRef(false);
//   useEffect(() => {
//     if (wasMountedRef.current && !isLayerMounted) {
//       handleCloseEnd?.();
//     }
//     if (isModalMounted || isLayerMounted) {
//       wasMountedRef.current = true;
//     }
//   }, [isModalMounted, isLayerMounted]);

//   useClickOutside(modalRef, e => {
//     // Do not close if targeting another modal actually.
//     if (layerRef.current?.isSameNode(e.target as Element)) {
//       handleClose?.();
//     }
//   });

//   useFocusTrap(modalRef);

//   const isOnTop = useStack(modalStackId);

//   useEffect(() => {
//     if (!isOnTop || typeof window === 'undefined') {
//       return;
//     }
//     const listener = e => e.key === 'Escape' && handleClose?.();
//     window.addEventListener('keydown', listener);
//     return () => {
//       window.removeEventListener('keydown', listener);
//     };
//   }, [isOnTop]);

//   if (!isLayerMounted) {
//     return null;
//   }

//   return (
//     <Layer ref={layerRef} {...layerTransitionProps} kind="backdrop">
//       {isModalMounted && (
//         <Modal ref={modalRef} {...modalTransitionProps} {...rest} />
//       )}
//     </Layer>
//   );
// });

// const modalStackId = Symbol();
