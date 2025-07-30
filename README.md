# EUC_Portal
Docker 기반

25.07.30
인증서 적용방안 로직 변경
/etc/kubernetes/EUC/Keycloak/script01.sh
변경전
kubectl create secret tls keycloak-tls --cert=tls.crt --key=tls.key -n keycloak
변경후
kubectl create secret tls keycloak-tls --cert=fullchain.pem --key=privkey.pem -n keycloak
-------------------------------------------------------------------------------------------
