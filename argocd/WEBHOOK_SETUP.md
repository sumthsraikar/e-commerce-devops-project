# GitHub Webhook Configuration for ArgoCD (Minikube)

This guide shows you how to connect **GitHub Webhooks** directly to your **ArgoCD instance running on Minikube** so that every time GitHub Actions commits new image tags, ArgoCD syncs and deploys the changes **instantly (0-second delay)** without waiting for polling intervals.

---

## 1. Configure Webhook Secret in ArgoCD

ArgoCD validates incoming GitHub webhooks using a shared secret.

### Step 1.1: Generate a Secure Webhook Secret
Choose a random secret token (e.g. `mySecretWebhookToken12345`).

### Step 1.2: Add Secret to ArgoCD in Minikube
Run the following PowerShell command in your terminal:

```powershell
# Set your secret token
$WEBHOOK_SECRET = "mySecretWebhookToken12345"

# Patch argocd-secret with the GitHub webhook secret
kubectl patch secret argocd-secret -n argocd -p "{\`"stringData\`": {\`"webhook.github.secret\`": \`"$WEBHOOK_SECRET\`"}}"
```

---

## 2. Expose ArgoCD Webhook to the Internet (Minikube)

Because Minikube runs locally on your machine, GitHub (`github.com`) cannot reach `localhost` directly unless you expose it. You have two easy options:

### Option A: Using ngrok (Recommended & Easiest)
1. In a separate terminal, start port forwarding to your ArgoCD server:
   ```powershell
   kubectl port-forward svc/argocd-server -n argocd 8080:443
   ```
2. In another terminal, expose port 8080 via ngrok:
   ```powershell
   ngrok http https://localhost:8080
   ```
3. Copy the public forwarding URL provided by ngrok (e.g., `https://a1b2-c3d4.ngrok-free.app`).

---

## 3. Configure the Webhook in GitHub

1. Open your repository on GitHub: `https://github.com/sumthsraikar/e-commerce-devops-project`
2. Go to **Settings** -> **Webhooks** -> click **Add webhook**.
3. Fill in the fields:
   - **Payload URL**: `https://<YOUR-NGROK-OR-PUBLIC-URL>/api/webhook`  
     *(Example: `https://a1b2-c3d4.ngrok-free.app/api/webhook`)*
   - **Content type**: `application/json`
   - **Secret**: The exact secret you created in Step 1 (e.g. `mySecretWebhookToken12345`)
   - **SSL verification**: Select `Enable SSL verification` (or `Disable` if using self-signed certs)
   - **Which events would you like to trigger this webhook?**: Select **"Just the push event"**
   - Check **Active**
4. Click **Add webhook**.

---

## 4. Enable Auto-Sync on Your ArgoCD Application

Apply the automated sync application configuration:

```powershell
kubectl apply -f argocd/application.yaml
```

---

## 5. End-to-End Verification

1. Make a code change and push to `main` branch.
2. In GitHub, open the **Actions** tab to watch the build and manifest update job run.
3. Once the workflow commits the new image tags back to `main`, GitHub fires the Webhook.
4. Open the ArgoCD UI (`https://localhost:8080`), and you will see the application immediately transition to **Syncing** and then **Healthy & Synced** with your new Docker image tags!
